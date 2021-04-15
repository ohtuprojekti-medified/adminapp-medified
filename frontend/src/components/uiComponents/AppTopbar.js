/**
 * Component for applications UI topbar
 *
 * @module src/components/uiComponents/AppTopbar
 * @requires react
 * @requires primereact/toolbar
 * @requires primereact/button
 * @requires services/loginService
 * @requires components/uiComponents/AppHeader
 */
import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import Filter from '../Filter'
import Organisations from '../Organisations'
import Header from './AppHeader'
import { useDispatch } from 'react-redux'
import { handleLogout } from '../../reducers/loginReducer'


/**
 * Component for applications UI topbar
 *
 * @param {*} param0 - all props from App.js
 * @returns {object} - JSX Topbar component
 */
const AppTopbar = ({ user, caregiverFilterForAllUsers, handleFilterChange,
  visible, setVisible, organisations, handleOrganisationChange, organisationSelect }) => {

  const dispatch = useDispatch()

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
  const logoutUser = async (event) => {
    event.preventDefault()
    try {
      dispatch(handleLogout())
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
   *
   * @returns {object} - JSX component containing right side of the top bar
   */
  const rightContents = (
    <React.Fragment>
      {user
        ?
        <div>
          <Sidebar position="right" className="ui-sidebar-sm" visible={visible} onHide={() => setVisible(false)}>
            <Filter handleFilterChange={handleFilterChange} checked={caregiverFilterForAllUsers} description=' Show only app users with caregiver' />
            {user.admin
              ? <Organisations organisations={organisations} handleOrganisationChange={handleOrganisationChange} organisationSelect={organisationSelect} />
              : null}
          </Sidebar>

          <Button label={'Filter'} icon="pi pi-filter" className="p-mr-2" onClick={() => setVisible(true)} />
          <Button label={user.admin ? 'admin' : user.organisation} icon="pi pi-globe" className="p-mr-2" />
          <Button label={user.username} icon="pi pi-user" className="p-mr-2" />
          <Button label="Log out" icon="pi pi-power-off" className="p-button-danger" onClick={logoutUser} />
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