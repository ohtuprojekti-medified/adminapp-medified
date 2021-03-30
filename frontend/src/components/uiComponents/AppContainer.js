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
  top: '0vh',
  bottom: '100vh'
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
          <Users users={appUsers} checked={caregiverFilterForAllUsers} handleFilterChange={handleFilterChange} />
          <Caregivers caregivers={caregivers} />
          <Cumulative cumulative={cumulativeUsers} activeUsers={activeUsers} />
          <RetentionRate
            retentionRates={retentionRates}
            average={averageRetention} />
        </div>
        :
        null}
      <div>
        < AppFooter />
      </div>
    </div>
  )
}