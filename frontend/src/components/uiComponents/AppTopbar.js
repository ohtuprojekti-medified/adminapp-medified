/**
 * Component for applications UI topbar
 *
 * @module src/components/uiComponents/AppTopbar
 * @requires react
 * @requires primereact/toolbar
 * @requires primereact/button
 * @requires react-router-dom
 * @requires services/loginService
 * @requires components/uiComponents/AppHeader
 * @requires components/uiComponents/AppContent
 * @requires components/RetentionRate
 * @requires components/Cumulative
 */
import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import Filter from '../Filter'
import loginService from '../../services/loginService'

import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom'

import Header from './AppHeader'
import AppContent from './AppContent'
import RetentionRate from '../RetentionRate'
import Cumulative from '../Cumulative'

/**
 * Component for applications UI topbar
 *
 * @param {*} param0 - all props from App.js
 * @returns {object} - JSX Topbar component
 */
const AppTopbar = ({ user, appUsers, caregiverFilterForAllUsers, handleFilterChange, caregivers, cumulativeUsers, activeUsers, retentionRates, averageRetention,
  username, setUsername, password, setPassword, setUser, visible, setVisible }) => {

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
      return
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

  /**
   * Contents for the left side of primereact's toolbar
   */
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

  /**
   * Contents for the right side of primereact's toolbar
   */
  const rightContents = (
    <React.Fragment>
      {user
        ?
        <div>
          <Sidebar position="right" className="ui-sidebar-sm" visible={visible} onHide={() => setVisible(false)}>
            <Filter handleFilterChange={handleFilterChange} checked={caregiverFilterForAllUsers} description=' Show only app users with caregiver' />
          </Sidebar>

          <Button label={'Filter'} icon="pi pi-filter" className="p-mr-2" onClick={() => setVisible(true)}/>
          <Button label={user.admin ? 'admin' : user.organisation} icon="pi pi-globe" className="p-mr-2" />
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
        <Route path='/home'>
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
        <Route path='/'>
          <Redirect to='/home' />
        </Route>
      </Router>
    </div>
  )
}

export default AppTopbar