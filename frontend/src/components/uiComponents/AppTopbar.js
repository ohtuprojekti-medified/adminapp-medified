import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import loginService from '../../services/loginService'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header from './AppHeader'

import AppContent from './AppContent'
import RetentionRate from '../RetentionRate'
import Cumulative from '../Cumulative'

const AppTopbar = ({ user, appUsers, caregiverFilterForAllUsers, handleFilterChange, caregivers, cumulativeUsers, activeUsers, retentionRates, averageRetention,
  username, setUsername, password, setPassword, setUser }) => {

  /**
   * Handle logout button presses
   *
   * @type {object}
   * @function
   * @constant
   * @memberof module:src/components/LoginForm
   * @inner
   * @param {object} event - Contains event
   */
  const handleLogOut = async (event) => {
    event.preventDefault()
    try {
      await loginService.logOut()
      setUser(undefined)
    } catch (exception) {
      console.log('An error occured')
    }
  }

  const titleStyle = {
    paddingRight: '10px',
    marginLeft: '1px',
    margin: '5px'
  }

  const toolbarStyle = {
    backgroundColor: '#beede7'
  }

  const leftContents = (
    <React.Fragment>
      <h2 style={titleStyle}> Adminapp for monitoring moods </h2>
      {user
        ?
        <div>
          <Header />
        </div>
        : null}
    </React.Fragment>
  )

  const rightContents = (
    <React.Fragment>
      {user
        ?
        <div>
          <Button label={user.username} icon="pi pi-user" className="p-mr-2" />
          <Button label="Log out" icon="pi pi-power-off" className="p-button-danger" onClick={handleLogOut} />
        </div>
        :
        null}

    </React.Fragment>
  )

  const centered = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <div className="p-component">
      <Router>
        <Toolbar left={leftContents} right={rightContents} style={toolbarStyle} />
        <Route exact path='/'>
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
            setPassword={setPassword}
            setUser={setUser} />

        </Route>
        <Route exact path='/home'>
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
            setPassword={setPassword}
            setUser={setUser} />
        </Route>
        <Route exact path='/retention'>
          <div style={centered}>
            <RetentionRate retentionRates={retentionRates}
              averageRetention={averageRetention} />
          </div>
        </Route>
        <Route exact path='/cumulative'>
          <div style={centered}>
            <Cumulative cumulative={cumulativeUsers}
              activeUsers={activeUsers} />
          </div>
        </Route>
      </Router>

    </div>
  )
}

export default AppTopbar