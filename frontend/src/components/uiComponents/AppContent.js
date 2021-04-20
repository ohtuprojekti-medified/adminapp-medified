/**
 * Component containing all UI components on the home page
 *
 * @module src/components/uiComponents/AppContent
 * @requires react
 * @requires react-router-dom
 * @requires components/Users
 * @requires components/Caregivers
 * @requires components/Cumulative
 * @requires components/RetentionRate
 */
import React from 'react'
import { BrowserRouter as Route, Switch } from 'react-router-dom'

import Users from '../Users'
import Caregivers from '../Caregivers'
import Cumulative from '../Cumulative'
import RetentionRate from '../RetentionRate'
import MoodAverage from '../MoodAverage'

/**
 * Component containing all UI components on the home page
 *
 * @param {*} param0 - all props from App.js
 * @returns {object} - JSX component containing all sub components
 */
const AppContent = ({ appUsers, caregivers, cumulativeUsers, activeUsers,
  retentionRates, averageRetention, moodAverages, BDIAverages, PHQ9Averages,
  moodGraph, handleMoodGraphChange }) => {

  const subContainer1 = {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const subContainer2 = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const centered = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <div className="body">
      <Switch>

        <Route path='/retention'>
          <div style={centered}>
            <RetentionRate
              retentionRates={retentionRates}
              average={averageRetention} />
          </div>
        </Route>

        <Route path='/cumulative'>
          <div style={centered}>
            <Cumulative cumulative={cumulativeUsers}
              activeUsers={activeUsers} />
          </div>
        </Route>

        <Route path='/moodaverages'>
          <div style={centered}>
            <MoodAverage moodAverages={moodAverages} />
          </div>
        </Route>

        <Route path='/'>
          <div className="p-grid p-fluid dashboard" style={subContainer1}>
            <Users users={appUsers} />
            <Caregivers caregivers={caregivers} />
          </div>
          <div>
            <div style={subContainer2} >
              <Cumulative cumulative={cumulativeUsers} activeUsers={activeUsers} />
            </div>
            <div style={subContainer2}>
              <RetentionRate
                retentionRates={retentionRates}
                average={averageRetention} />
            </div>
            <div style={centered}>
              <MoodAverage
                moodAverages={moodAverages}
                BDIAverages={BDIAverages}
                PHQ9Averages={PHQ9Averages}
                moodGraph={moodGraph}
                handleMoodGraphChange={handleMoodGraphChange} />
            </div>
          </div>
        </Route>

      </Switch>
    </div>
  )
}

export default AppContent