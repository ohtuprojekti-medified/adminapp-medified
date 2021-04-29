/**.
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
 * @memberof module:src/App
 * @returns {object} - A single page application in JSX
 */
const App = () => {
  const [appUsers, setAppUsers] = useState([])
  const [caregivers, setCaregivers] = useState([])
  const [cumulativeUsers, setCumulative] = useState([])
  const [activeUsers, setActive] = useState([])
  const [retentionRates, setRetentionRates] = useState([])
  const [averageRetention, setAverageRetention] = useState([])
  const [user, setUser] = useState(undefined)
  const [caregiverFilterForAllUsers, setCaregiverFilterForAllUsers] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [organisationSelect, setOrganisation] = useState('ALL')
  const [visible, setVisible] = useState(false)
  const [organisations, setOrganisations] = useState([])
  const [startDateEnable, setStartDateEnable] = useState(false)
  const [endDateEnable, setEndDateEnable] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [moodDataSelect, setMoodDataSelect] = useState('MOOD')
  const [moodAverages, setMoodAverages] = useState([])
  const [moodChartData, setMoodChartData] = useState([])
  const [weeklyImprovementAverages, setWeeklyImprovementAverages] = useState([])
  const [weeklyImprovementChartData, setWeeklyImprovementChartData] = useState([])
  const [totalImprovementAverages, setTotalImprovementAverages] = useState([])
  const [totalImprovementChartData, setTotalImprovementChartData] = useState([])
  const [byUsingPeriodFilter, setByUsingPeriodFilter] = useState(true)
  const [moodAveragesByPeriod, setMoodAveragesByPeriod] = useState([])
  const [moodChartDataByPeriod, setMoodChartDataByPeriod] = useState([])
  const [weeklyImprovementAveragesByPeriod, setWeeklyImprovementAveragesByPeriod] = useState([])
  const [weeklyImprovementChartDataByPeriod, setWeeklyImprovementChartDataByPeriod] = useState([])
  const [totalImprovementAveragesByPeriod, setTotalImprovementAveragesByPeriod] = useState([])
  const [totalImprovementChartDataByPeriod, setTotalImprovementChartDataByPeriod] = useState([])

  /**.
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
          if (user.admin) {
            dataService.getAll('organisations?organisation=ALL').then(organisations => setOrganisations(organisations))
          }
          dataService.getAll(`users?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}`).then(usersAtBeginning => setAppUsers(usersAtBeginning))
          dataService.getAll(`caregivers?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}`).then(caregivs => setCaregivers(caregivs))
          dataService.getAll(`cumulative?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}`).then(cumulativeUsers => setCumulative(cumulativeUsers))
          dataService.getAll(`retention?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}`).then(retentionRates => setRetentionRates(retentionRates))
          dataService.getAll(`avgretention?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}`).then(average => setAverageRetention(average))
          dataService.getAll(`activeusers?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}`).then(active => setActive(active))
          dataService.getAll(`weeklyvalues?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}`).then(weeklyValues => {
            setMoodAverages(weeklyValues)
            setMoodChartData(weeklyValues)
          })
          dataService.getAll(`weeklyimprovement?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}`).then(weeklyImprovement => {
            setWeeklyImprovementAverages(weeklyImprovement)
            setWeeklyImprovementChartData(weeklyImprovement)
          })
          dataService.getAll(`totalimprovement?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}`).then(totalImprovement => {
            setTotalImprovementAverages(totalImprovement)
            setTotalImprovementChartData(totalImprovement)
          })
          dataService.getAll(`weeklyvalues?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}&byUsingPeriod=${byUsingPeriodFilter}`).then(weeklyValues => {
            setMoodAveragesByPeriod(weeklyValues)
            setMoodChartDataByPeriod(weeklyValues)
          })
          dataService.getAll(`weeklyimprovement?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}&byUsingPeriod=${byUsingPeriodFilter}`).then(weeklyImprovement => {
            setWeeklyImprovementAveragesByPeriod(weeklyImprovement)
            setWeeklyImprovementChartDataByPeriod(weeklyImprovement)
          })
          dataService.getAll(`totalimprovement?withcaregiver=${caregiverFilterForAllUsers}&organisation=${organisationSelect}&startDate=${startDate}&endDate=${endDate}&variable=${moodDataSelect}&byUsingPeriod=${byUsingPeriodFilter}`).then(totalImprovement => {
            setTotalImprovementAveragesByPeriod(totalImprovement)
            setTotalImprovementChartDataByPeriod(totalImprovement)
          })
        }
      }
    }

    fetchData()

  }, [user, caregiverFilterForAllUsers, organisationSelect, startDate, endDate, startDateEnable, endDateEnable, moodDataSelect])

  /**.
   *
   * Event handler for changing the status of caregiveFilterForAllUsers
   *
   * @function
   * @constant
   * @memberof module:src/App
   */
  const handleFilterChange = () => {
    setCaregiverFilterForAllUsers(!caregiverFilterForAllUsers)
  }

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
   * @memberof module:src/App
   */
  const handleOrganisationChange = (organisation) => {
    setOrganisation(organisation)
  }

  /**.
   * Event handler for enabling timeframe start filter
   *
   * @function
   * @constant
   * @memberof module:src/App
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
   * @memberof module:src/App
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
   * @memberof module:src/App
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
   * @memberof module:src/App
   */
  const handleEndDateChange = (date) => {
    if (endDateEnable) {
      setEndDate(date)
    }
  }


  const moodGraphLabelsByDate = [
    { label: 'MOOD', averageMoodWeeklyData: moodAverages, weeklyImprovementData: weeklyImprovementAverages, totalImprovementData: totalImprovementAverages }
  ]
  const moodGraphLabelsByPeriod = [
    { label: 'MOOD', averageMoodWeeklyData: moodAveragesByPeriod, weeklyImprovementData: weeklyImprovementAveragesByPeriod, totalImprovementData: totalImprovementAveragesByPeriod }
  ]

  /**.
   *
   * Event handler for changing the status of moodGraph
   *
   * @param {string} label - Name of mood graph to be used
   */
  const handleMoodDataSelectChange = (label) => {
    setMoodDataSelect(label)
    setMoodChartData(moodGraphLabelsByDate.filter(entry => entry.label === label)[0].averageMoodWeeklyData)
    setWeeklyImprovementChartData(moodGraphLabelsByDate.filter(entry => entry.label === label)[0].weeklyImprovementData)
    setTotalImprovementChartData(moodGraphLabelsByDate.filter(entry => entry.label === label)[0].totalImprovementData)
    setMoodChartDataByPeriod(moodGraphLabelsByPeriod.filter(entry => entry.label === label)[0].averageMoodWeeklyData)
    setWeeklyImprovementChartDataByPeriod(moodGraphLabelsByPeriod.filter(entry => entry.label === label)[0].weeklyImprovementData)
    setTotalImprovementChartDataByPeriod(moodGraphLabelsByPeriod.filter(entry => entry.label === label)[0].totalImprovementData)
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

              <AppContent user={user}
                appUsers={appUsers}
                caregivers={caregivers}
                caregiverFilterForAllUsers={caregiverFilterForAllUsers}
                handleFilterChange={handleFilterChange}
                cumulativeUsers={cumulativeUsers}
                activeUsers={activeUsers}
                retentionRates={retentionRates}
                averageRetention={averageRetention}
                moodChartData={moodChartData}
                weeklyImprovementAverages={weeklyImprovementChartData}
                totalImprovementAverages={totalImprovementChartData}
                moodChartDataByPeriod={moodChartDataByPeriod}
                weeklyImprovementAveragesByPeriod={weeklyImprovementChartDataByPeriod}
                totalImprovementAveragesByPeriod={totalImprovementChartDataByPeriod}
                handleByUsingPeriodChange={handleByUsingPeriodChange}
                byUsingPeriodFilter={byUsingPeriodFilter}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                setUser={setUser} />

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


