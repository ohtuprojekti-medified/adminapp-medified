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
import loginService from '../../services/loginService'

import Header from './AppHeader'

/**
 * Component for applications UI topbar
 *
 * @param {*} param0 - all props from App.js
 * @returns {object} - JSX Topbar component
 */
const AppTopbar = ({ user, setUser, caregiverFilterForAllUsers, handleFilterChange }) => {

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
          <Header checked={caregiverFilterForAllUsers} handleFilterChange={handleFilterChange} />
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
          <Button label={user.admin ? 'admin' : user.organisation} icon="pi pi-globe" className="p-mr-2" />
          <Button label={user.username} icon="pi pi-user" className="p-mr-2" />
          <Button label="Log out" icon="pi pi-power-off" className="p-button-danger" onClick={handleLogOut} />
        </div>
        :
        null}

    </React.Fragment>
  )

  return (
    <Toolbar left={leftContents} right={rightContents} style={toolbarStyle} />
  )
}

export default AppTopbar