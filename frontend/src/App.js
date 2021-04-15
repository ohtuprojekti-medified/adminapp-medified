/**
 * Frontend app
 *
 * @module src/App
 * @requires primereact/resources/themes/saga-blue/theme.css
 * @requires primereact/resources/primereact.min.css
 * @requires primeicons/primeicons.css
 * @requires react-transition-group
 * @requires primeflex/primeflex.css
 * @requires src/App.css
 * @requires src/services/dataService
 * @requires src/services/loginService
 * @requires react
 * @requires aws-amplify
 * @requires src/components/LoginForm
 * @requires src/components/uiComponents/AppTopbar
 * @requires src/components/uiComponents/AppFooter
 * @requires src/components/uiComponents/AppContent
 * @requires dotenv
 */

import './App.css'

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import dataService from './services/dataService.js'

import LoginForm from './components/LoginForm'
import AppFooter from './components/uiComponents/AppFooter'
import AppTopbar from './components/uiComponents/AppTopbar'
import AppContent from './components/uiComponents/AppContent'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'react-transition-group'
import 'primeflex/primeflex.css'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout, initUser, refreshToken } from './reducers/loginReducer'

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
  const dispatch = useDispatch()
  const { user } = useSelector(state => state)

  const [appUsers, setAppUsers] = useState([])
  const [caregivers, setCaregivers] = useState([])
  const [cumulativeUsers, setCumulative] = useState([])
  const [activeUsers, setActive] = useState([])
  const [retentionRates, setRetentionRates] = useState([])
  const [averageRetention, setAverageRetention] = useState([])
  const [caregiverFilterForAllUsers, setCaregiverFilterForAllUsers] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [organisationSelect, setOrganisation] = useState('ALL')
  const [visible, setVisible] = useState(false)
  const [organisations, setOrganisations] = useState(null)

  /**
   * Configure amplify authorization and check if user is logged in
   *
   * @type {object}
   * @function
   * @memberof module:src/App
   * @inner
   */
  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  /**
   * Set token or refresh token and GET data if user logs in or is logged in. If secure ping fails twice user is logged out.
   *
   * @type {object}
   * @function
   * @memberof module:src/App
   * @inner
   */
  useEffect(() => {
    const securePing = async () => {
      try {
        const pingStatus = await dataService.getAll('ping')
        return pingStatus
      } catch (error) {
        return
      }
    }

    const fetchData = async () => {
      if (user) {
        const ping1 = await securePing()
        if (ping1 === 403) {
          dispatch(refreshToken)
          const ping2 = await securePing()
          if (ping2 === 403) {
            dispatch(handleLogout)
          }
        }

        if (user) {
          if (user.admin) {
            dataService.getAll('organisations?organisation=ALL').then(organisations => setOrganisations(organisations))
          }
          dataService.getAll(`users?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}`).then(usersAtBeginning => setAppUsers(usersAtBeginning))
          dataService.getAll(`caregivers?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}`).then(caregivs => setCaregivers(caregivs))
          dataService.getAll(`cumulative?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}`).then(cumulativeUsers => setCumulative(cumulativeUsers))
          dataService.getAll(`retention?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}`).then(retentionRates => setRetentionRates(retentionRates))
          dataService.getAll(`avgretention?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}`).then(average => setAverageRetention(average))
          dataService.getAll(`activeusers?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}`).then(active => setActive(active))
        }
      }
    }

    fetchData()

  }, [user, caregiverFilterForAllUsers, organisationSelect])

  /**
   *
   * Event handler for changing the status of caregiveFilterForAllUsers
   */
  const handleFilterChange = () => {
    setCaregiverFilterForAllUsers(!caregiverFilterForAllUsers)
  }

  /**
   *
   * Event handler for changing the selected organisation
   *
   * @param {string} organisation - Requested organisation
   */
  const handleOrganisationChange = (organisation) => {
    setOrganisation(organisation)
  }

  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f2f2f2',
    paddingBottom: '100px'
  }

  return (
    <div className='App'>
      <Router basename={process.env.REACT_APP_ROUTER_BASENAME}>
        {user ?
          <div style={containerStyle}>
            <div className='p-component'>
              <AppTopbar user={user}
                caregiverFilterForAllUsers={caregiverFilterForAllUsers}
                handleFilterChange={handleFilterChange}
                organisations={organisations}
                visible={visible}
                setVisible={setVisible}
                organisationSelect={organisationSelect}
                handleOrganisationChange={handleOrganisationChange} />

              <AppContent user={user}
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
                setPassword={setPassword} />

            </div>
            <AppFooter />
          </div>
          :
          <>
            <AppTopbar user={user}
              caregiverFilterForAllUsers={caregiverFilterForAllUsers}
              handleFilterChange={handleFilterChange} />
            <LoginForm username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              user={user} />
          </>
        }
      </Router>
    </div>
  )
}

export default App


