/**
 * Frontend app
 *
 * @module src/App
 * @requires primereact/resources/themes/vela-purple/theme.css
 * @requires primereact/resources/primereact.min.css
 * @requires primeicons/primeicons.css
 * @requires src/App.css
 * @requires src/services/dataService
 * @requires src/services/loginService
 * @requires react
 * @requires aws-amplify
 * @requires src/components/Users
 * @requires src/components/Caregivers
 * @requires src/components/LoginForm
 * @requires src/components/Cumulative
 * @requires src/components/RetentionRate
 * @requires dotenv
 */

// Muut mahdolliset teemat: saga ja arya, ja värit: orange, green, blue
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import './App.css'

import React, { useEffect, useState } from 'react'
import Amplify from 'aws-amplify'
import dataService from './services/dataService.js'
import loginService from './services/loginService'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'react-transition-group'
import 'primeflex/primeflex.css'

// import PrimeReact from 'primereact/api'

import { AppContainer } from './components/uiComponents/AppContainer'


/**
 * Creates a single page application
 *
 * @type {object}
 * @function
 * @memberof module:src/App
 * @inner
 * @returns {object} - A single page application in JSX
 */
const App = () => {
  const [appUsers, setAppUsers] = useState([])
  const [caregivers, setCaregivers] = useState([])
  const [cumulativeUsers, setCumulative] = useState([])
  const [activeUsers, setActive] = useState([])
  const [retentionRates, setRetentionRates] = useState([])
  const [averageRetention, setAverageRetention] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(undefined)
  const [caregiverFilterForAllUsers, setCaregiverFilterForAllUsers] = useState(false)

  /**
   * Configure amplify authorization and check if user is logged in
   *
   * @type {object}
   * @function
   * @memberof module:src/App
   * @inner
   */
  useEffect(() => {
    require('dotenv').config()
    Amplify.configure({
      Auth: {
        userPoolId: 'eu-west-1_sAj8nsLY6',
        userPoolWebClientId: '57bgrf7014uhtdu95jm8ci2ok5',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
      }
    })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
  }, [])

  /**
   * Set token or refresh token and GET data if user logs in or is logged in. If secure ping fails twice user is logged out.
   *
   * @type {object}
   * @function
   * @memberof module:src/App
   * @inner
   */
  useEffect(() => {
    const refreshToken = async () => {
      try {
        await Amplify.Auth.currentSession()
        const cognitoUser = await Amplify.Auth.currentAuthenticatedUser()
        const refreshedUser = {
          username: cognitoUser.username,
          idToken: cognitoUser.signInUserSession.idToken.jwtToken
        }
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(refreshedUser)
        )
        return refreshedUser
      } catch (error) {
        return
      }
    }

    const securePing = async () => {
      try {
        const pingStatus = await dataService.getAll('ping')
        return pingStatus
      } catch (error) {
        return
      }
    }

    const logOut = async () => {
      try {
        await loginService.logOut()
        setUser(undefined)
      } catch (exception) {
        return
      }
    }

    const fetchData = async () => {
      if (user) {
        dataService.setToken(user.idToken)
        const ping1 = await securePing()
        if (ping1 === 403) {
          const refreshedUser = await refreshToken()
          dataService.setToken(refreshedUser.idToken)
          const ping2 = await securePing()
          if (ping2 === 403) {
            await logOut()
          } else {
            setUser(refreshedUser)
            return
          }
        }

        if (user) {
          dataService.getAll(`users?withcaregiver=${caregiverFilterForAllUsers}`).then(usersAtBeginning => setAppUsers(usersAtBeginning))
          dataService.getAll('caregivers').then(caregivs => setCaregivers(caregivs))
          dataService.getAll('cumulative').then(cumulativeUsers => setCumulative(cumulativeUsers))
          dataService.getAll('retention').then(retentionRates => setRetentionRates(retentionRates))
          dataService.getAll('avgretention').then(average => setAverageRetention(average))
          dataService.getAll('activeusers').then(active => setActive(active))
        }
      }
    }

    fetchData()

  }, [user, caregiverFilterForAllUsers])

  /**
   *
   * Event handler for changing the status of caregiveFilterForAllUsers
   */
  const handleFilterChange = () => {
    setCaregiverFilterForAllUsers(!caregiverFilterForAllUsers)
  }

  return (
    <div>
      <div className="App">
        <div> <AppContainer
          user={user}
          appUsers={appUsers}
          caregivers={caregivers}
          caregiverFilterForAllUsers={caregiverFilterForAllUsers}
          handleFilterChange={handleFilterChange}
          cumulativeUsers={cumulativeUsers}
          activeUsers={activeUsers}
          retentionRates={retentionRates}
          averageRetention={averageRetention}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
        />
        </div>

      </div>
    </div>
  )
}

export default App
