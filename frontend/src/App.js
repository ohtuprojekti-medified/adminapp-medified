/**.
 * Frontend app
 *
 * @module frontend/src/App
 * @requires primereact/resources/themes/saga-blue/theme.css
 * @requires primereact/resources/primereact.min.css
 * @requires primeicons/primeicons.css
 * @requires react-transition-group
 * @requires primeflex/primeflex.css
 * @requires frontend/src/App.css
 * @requires frontend/src/services/dataService
 * @requires frontend/src/services/loginService
 * @requires react
 * @requires aws-amplify
 * @requires frontend/src/components/LoginForm
 * @requires frontend/src/components/uiComponents/AppTopbar
 * @requires frontend/src/components/uiComponents/AppFooter
 * @requires frontend/src/components/uiComponents/AppContent
 * @requires dotenv
 * @exports App - React application
 */

import './App.css'

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Amplify from 'aws-amplify'
import dataService from './services/dataService.js'
import loginService from './services/loginService'

import LoginForm from './components/LoginForm'
import AppFooter from './components/uiComponents/AppFooter'
import AppTopbar from './components/uiComponents/AppTopbar'
import AppContent from './components/uiComponents/AppContent'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'react-transition-group'
import 'primeflex/primeflex.css'

/**.
 * Creates a single page application
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:frontend/src/App
 * @returns {object} - A single page application in JSX
 */
const App = () => {
  const [organisations, setOrganisations] = useState([])
  const [data, setData] = useState({
    'appUsers': [],
    'caregivers': [],
    'cumulativeUsers': [],
    'activeUsers': [],
    'retentionRates': [],
    'averageRetention': [],
    'moodChartData': [],
    'weeklyImprovementAverages': [],
    'totalImprovementAverages': [],
    'moodChartDataByPeriod': [],
    'weeklyImprovementAveragesByPeriod': [],
    'totalImprovementAveragesByPeriod': [] })

  const [byUsingPeriodFilter, setByUsingPeriodFilter] = useState(true)
  const [startDateEnable, setStartDateEnable] = useState(false)
  const [endDateEnable, setEndDateEnable] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [moodDataSelect, setMoodDataSelect] = useState('MOOD')
  const [user, setUser] = useState(undefined)
  const [caregiverFilterForAllUsers, setCaregiverFilterForAllUsers] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [organisationSelect, setOrganisation] = useState('ALL')
  const [visible, setVisible] = useState(false)

  /**.
   * Configure amplify authorization and check if user is logged in
   *
   * @type {object}
   * @function
   * @memberof module:frontend/src/App
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


  useEffect(() => {
    const refreshToken = async () => {
      try {
        await Amplify.Auth.currentSession()
        const cognitoUser = await Amplify.Auth.currentAuthenticatedUser()
        const refreshedUser = {
          username: cognitoUser.username,
          idToken: cognitoUser.signInUserSession.idToken.jwtToken,
          organisation: cognitoUser.attributes['custom:organisation'],
          admin: cognitoUser.attributes['custom:admin']
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

    const secureUserConnection = async () => {
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
            console.log('Set refreshedUser')
            setUser(refreshedUser)
            return
          }
        }
      }
    }

    secureUserConnection()

  }, [user])

  /**
   * Set token or refresh token and GET data if user logs in or is logged in. If secure ping fails twice user is logged out.
   *
   * @type {object}
   * @function
   * @memberof module:frontend/src/App
   * @inner
   */
  useEffect(() => {
    const fetchData = async () => {
        if (user) {
        console.log('And we have user set')
          if (user.admin) {
          const organisations = await dataService.getAll('organisations?organisation=ALL')
          setOrganisations(organisations)
          console.log('ADMINN')
          }
        const appUsers = await dataService.getAll(`users?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}`)
        const caregivers = await dataService.getAll(`caregivers?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}`)
        const cumulativeUsers = await dataService.getAll(`cumulative?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}`)
        const activeUsers = await dataService.getAll(`activeusers?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}`)
        const retentionRates = await dataService.getAll(`retention?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}`)
        const averageRetention = await dataService.getAll(`avgretention?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}`)
        const weeklyValues = await dataService.getAll(`weeklyvalues?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}`)
        const weeklyImprovementAverages = await dataService.getAll(`weeklyimprovement?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}`)
        const totalImprovements = await dataService.getAll(`totalimprovement?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}`)
        const weeklyValuesByPeriod = await dataService.getAll(`weeklyvalues?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}&byUsingPeriod=${byUsingPeriodFilter}`)
        const weeklyImprovementsByPeriod = await dataService.getAll(`weeklyimprovement?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}&byUsingPeriod=${byUsingPeriodFilter}`)
        const totalImprovementsByPeriod = await dataService.getAll(`totalimprovement?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}&byUsingPeriod=${byUsingPeriodFilter}`)


        setData({
          appUsers,
          caregivers,
          cumulativeUsers,
          activeUsers,
          retentionRates,
          averageRetention,
          'moodAverages': weeklyValues,
          'moodChartData': weeklyValues,
          'weeklyImprovementAverages': weeklyImprovementAverages,
          'weeklyImprovementChartData': weeklyImprovementAverages,
          'totalImprovementAverages': totalImprovements,
          'totalImprovementChartData': totalImprovements,
          'moodAveragesByPeriod': weeklyValuesByPeriod,
          'moodChartDataByPeriod': weeklyValuesByPeriod,
          'weeklyImprovementAveragesByPeriod': weeklyImprovementsByPeriod,
          'weeklyImprovementChartDataByPeriod': weeklyImprovementsByPeriod,
          'totalImprovementAveragesByPeriod': totalImprovementsByPeriod,
          'totalImprovementChartDataByPeriod': totalImprovementsByPeriod
          })
        console.log(caregivers)
        // setAppUsers(appUsers)
        // setCaregivers(caregivers)
        // setCumulative(cumulativeUsers)
        // setActive(activeUsers)
        // setRetentionRates(retentionRates)
        // setAverageRetention(averageRetention)
        // setMoodAverages(weeklyValues)
        // setMoodChartData(weeklyValues)
        // setWeeklyImprovementAverages(weeklyImprovementAverages)
        // setWeeklyImprovementChartData(weeklyImprovementAverages)
        // setTotalImprovementAverages(totalImprovements)
        // setTotalImprovementChartData(totalImprovements)
        // setMoodAveragesByPeriod(weeklyValuesByPeriod)
        // setMoodChartDataByPeriod(weeklyValuesByPeriod)
        // setWeeklyImprovementAveragesByPeriod(weeklyImprovementsByPeriod)
        // setWeeklyImprovementChartDataByPeriod(weeklyImprovementsByPeriod)
        // setTotalImprovementAveragesByPeriod(totalImprovementsByPeriod)
        // setTotalImprovementChartDataByPeriod(totalImprovementsByPeriod)
      }
    }

    console.log('FetchData effectHook is run')

    fetchData()

  }, [user, caregiverFilterForAllUsers, organisationSelect, startDate, endDate, startDateEnable, endDateEnable, moodDataSelect, byUsingPeriodFilter])


  console.log('App.js is rendered')
  /**.
   *
   * Event handler for changing the status of caregiveFilterForAllUsers
   *
   * @function
   * @constant
   * @memberof module:frontend/src/App
   */
  const handleFilterChange = () => {
    setCaregiverFilterForAllUsers(!caregiverFilterForAllUsers)
  }

  /**.
   *
   * Event handler for changuing the status of byUsingPeriodFilter
   *
   * @function
   * @constant
   * @memberof module:src/App
   */
  const handleByUsingPeriodChange = () => {
    setByUsingPeriodFilter(!byUsingPeriodFilter)
  }

  /**.
   *
   * Event handler for changing the selected organisation
   *
   * @param {string} organisation - Requested organisation
   * @function
   * @constant
   * @memberof module:frontend/src/App
   */
  const handleOrganisationChange = (organisation) => {
    setOrganisation(organisation)
  }

  /**.
   * Event handler for enabling timeframe start filter
   *
   * @function
   * @constant
   * @memberof module:frontend/src/App
   */
  const handleStartDateEnableChange = () => {
    if (startDateEnable) {
      setStartDateEnable(false)
      setStartDate('')
    } else {
      setStartDateEnable(true)
    }
  }

  /**.
   * Event handler for enabling timeframe end filter
   *
   * @function
   * @constant
   * @memberof module:frontend/src/App
   */
  const handleEndDateEnableChange = () => {
    if (endDateEnable) {
      setEndDateEnable(false)
      setEndDate('')
    } else {
      setEndDateEnable(true)
    }
  }

  /**.
   * Event handler for changeing timeframe filter start value
   *
   * @param {string} date - Date where to begin showing data
   * @function
   * @constant
   * @memberof module:frontend/src/App
   */
  const handleStartDateChange = (date) => {
    if (startDateEnable) {
      setStartDate(date)
    }
  }

  /**.
   * Event handler for changeing timeframe filter end value
   *
   * @param {string} date - Date where to end showing data
   * @function
   * @constant
   * @memberof module:frontend/src/App
   */
  const handleEndDateChange = (date) => {
    if (endDateEnable) {
      setEndDate(date)
    }
  }


  const moodGraphLabelsByDate = [
    { label: 'MOOD' }
  ]

  /**.
   *
   * Event handler for changing the status of moodGraph
   *
   * @param {string} label - Name of mood graph to be used
   */
  const handleMoodDataSelectChange = (label) => {
    setMoodDataSelect(label)
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
                setUser={setUser}
                caregiverFilterForAllUsers={caregiverFilterForAllUsers}
                handleFilterChange={handleFilterChange}
                organisations={organisations}
                visible={visible}
                setVisible={setVisible}
                organisationSelect={organisationSelect}
                handleOrganisationChange={handleOrganisationChange}
                startDateEnable={startDateEnable}
                endDateEnable={endDateEnable}
                startDate={startDate}
                endDate={endDate}
                handleStartDateEnableChange={handleStartDateEnableChange}
                handleEndDateEnableChange={handleEndDateEnableChange}
                handleStartDateChange={handleStartDateChange}
                handleEndDateChange={handleEndDateChange}
                moodGraphLabels={moodGraphLabelsByDate}
                moodDataSelect={moodDataSelect}
                handleMoodDataSelectChange={handleMoodDataSelectChange} />

              <AppContent data={data}
                handleByUsingPeriodChange={handleByUsingPeriodChange}
                byUsingPeriodFilter={byUsingPeriodFilter} />

            </div>
            <AppFooter />
          </div>
          :
          <>
            <AppTopbar user={user}
              setUser={setUser}
              caregiverFilterForAllUsers={caregiverFilterForAllUsers}
              handleFilterChange={handleFilterChange} />
            <LoginForm username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              user={user}
              setUser={setUser} />
          </>
        }
      </Router>
    </div>
  )
}

export default App


