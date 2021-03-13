/**
 * Frontend app
 *
 * @module src/App
 * @requires primereact/resources/themes/vela-purple/theme.css
 * @requires primereact/resources/primereact.min.css
 * @requires primeicons/primeicons.css
 * @requires src/App.css
 * @requires src/services/userService
 * @requires src/services/caregiverService
 * @requires src/services/retentionService
 * @requires react
 * @requires aws-amplify
 * @requires src/components/Users
 * @requires src/components/Caregivers
 * @requires src/components/LoginForm
 * @requires src/components/RetentionRate
 * @requires dotenv
 */

// Muut mahdolliset teemat: saga ja arya, ja värit: orange, green, blue
import 'primereact/resources/themes/vela-purple/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import './App.css'

import userService from './services/userService'
import caregiverService from './services/caregiverService'
import retentionService from './services/retentionService'
import pingService from './services/pingService'
import loginService from './services/loginService'
import React, { useEffect, useState } from 'react'
import Amplify from 'aws-amplify'
import Users from './components/Users'
import Caregivers from './components/Caregivers'
import LoginForm from './components/LoginForm'
import RetentionRate from './components/RetentionRate'


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
  const [retentionRates, setRetentionRates] = useState([])
  const [averageRetention, setAverageRetention] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(undefined)

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
        console.log('error refreshing token', error)
      }
    }

    const securePing = async () => {
      try {
        const pingStatus = await pingService.securePing()
        return pingStatus
      } catch (error) {
        console.log('secure ping error', error)
      }
    }

    const logOut = async () => {
      try {
        await loginService.logOut()
        setUser(undefined)
      } catch (exception) {
        console.log('An error occured')
      }
    }

    const fetchData = async () => {
      if (user) {
        pingService.setToken(user.idToken)
        const ping1 = await securePing()
        if (ping1 === 403) {
          const refreshedUser = await refreshToken()
          pingService.setToken(refreshedUser.idToken)
          const ping2 = await securePing()
          if (ping2 === 403) {
            await logOut()
          } else {
            setUser(refreshedUser)
            return
          }
        }

        if (user) {
          userService.setToken(user.idToken)
          userService.getAll().then(usersAtBeginning => setAppUsers(usersAtBeginning))
          caregiverService.setToken(user.idToken)
          caregiverService.getAll().then(caregivs => setCaregivers(caregivs))
          retentionService.setToken(user.idToken)
          retentionService.getAll().then(retentionRates => setRetentionRates(retentionRates))
          retentionService.getAverage().then(average => setAverageRetention(average))
        }
      }
    }

    fetchData()

  }, [user])

  return (
    <div className="App">
      {user ? <h3>{user.username} logged in</h3>
        : null
      }
      <h1>Adminapp for monitoring moods</h1>
      <LoginForm username={username} setUsername={setUsername} password={password}
        setPassword={setPassword} user={user} setUser={setUser} />
      {user
        ?
        <div>
          <Users users={appUsers} />
          <Caregivers caregivers={caregivers} />
          <RetentionRate
            retentionRates={retentionRates}
            average={averageRetention} />
        </div>
        :
        null
      }
    </div>
  )
}

export default App
