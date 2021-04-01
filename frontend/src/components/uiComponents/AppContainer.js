import React from 'react'
import AppTopbar from './AppTopbar'
import AppFooter from './AppFooter'

import LoginForm from '../LoginForm'

import Users from '../Users'
import Caregivers from '../Caregivers'
import Cumulative from '../Cumulative'
import RetentionRate from '../RetentionRate'

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

export const AppContainer = ({ user, appUsers, caregiverFilterForAllUsers, handleFilterChange, caregivers, cumulativeUsers, activeUsers, retentionRates, averageRetention,
  username, setUsername, password, setPassword, setUser }) => {
  return (
    <div style={containerStyle}>
      <div>
        <AppTopbar user={user} setUser={setUser} />
      </div>
      {user
        ? null
        : <div>
          <LoginForm username={username} setUsername={setUsername} password={password}
            setPassword={setPassword} user={user} setUser={setUser} />
        </div>
      }

      {user
        ?
        <div>
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
        </div>
        :
        null}
      <div>
      </div>
      <div>
        <AppFooter />
      </div>
    </div>
  )
}