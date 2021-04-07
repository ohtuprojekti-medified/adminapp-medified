/**
 * Component containing all UI components on the home page
 *
 * @module src/components/uiComponents/AppContent
 * @requires react
 * @requires components/LoginForm
 * @requires components/Users
 * @requires components/Caregivers
 * @requires components/Cumulative
 * @requires components/RetentionRate
 */
import React from 'react'

import LoginForm from '../LoginForm'
import Users from '../Users'
import Caregivers from '../Caregivers'
import Cumulative from '../Cumulative'
import RetentionRate from '../RetentionRate'

/**
 * Component containing all UI components on the home page
 *
 * @param {*} param0 - all props from App.js
 * @returns {object} - JSX component containing all sub components
 */
const AppContent = ({ user, appUsers, caregiverFilterForAllUsers, handleFilterChange, caregivers, cumulativeUsers, activeUsers, retentionRates, averageRetention,
  username, setUsername, password, setPassword, setUser }) => {

  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f2f2f2',
    paddingBottom: '100px'
  }

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
  return (
    <div style={containerStyle}>
      {user
        ? null
        : <React.Fragment>
          <LoginForm username={username} setUsername={setUsername} password={password}
            setPassword={setPassword} user={user} setUser={setUser} />
        </React.Fragment>
      }

      {user
        ?
        <React.Fragment>
          <div className="p-grid p-fluid dashboard" style={subContainer1}>
            <Users users={appUsers} checked={caregiverFilterForAllUsers} handleFilterChange={handleFilterChange} />
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
          </div>
        </React.Fragment>
        :
        null}
      <div>
      </div>
    </div>
  )
}

export default AppContent