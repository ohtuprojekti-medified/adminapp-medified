/**.
 * Component for applications UI topbar
 *
 * @module src/components/uiComponents/AppTopbar
 * @requires react
 * @requires primereact/toolbar
 * @requires primereact/button
 * @requires src/services/loginService
 * @requires src/components/uiComponents/AppHeader
 * @requires src/components/Filter
 * @requires src/components/TimeFilter
 * @requires src/components/Organisations
 * @exports AppTopbar - Page topbar
 */
import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import Filter from '../Filter'
import TimeFilter from '../TimeFilter'
import Organisations from '../Organisations'
import loginService from '../../services/loginService'

import Header from './AppHeader'

/**.
 * Component for applications UI topbar
 *
 * @memberof module:src/components/uiComponents/AppTopbar
 * @param {*} param0 - all props from App.js
 * @returns {object} - JSX Topbar component
 */
const AppTopbar = ({ user, setUser, caregiverFilterForAllUsers, handleFilterChange,
  visible, setVisible, organisations, handleOrganisationChange, organisationSelect,
  startDateEnable, endDateEnable, startDate, endDate, handleStartDateEnableChange,
  handleEndDateEnableChange, handleStartDateChange, handleEndDateChange }) => {

  /**.
   * Handle logout button presses
   *
   * @type {object}
   * @function
   * @constant
   * @memberof module:src/components/uiComponents/AppTopbar
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

  /**.
   * Contents for the left side of primereact's toolbar
   *
   * @type {object}
   * @memberof module:src/components/uiComponents/AppTopbar
   * @inner
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

  /**.
   * Contents for the right side of primereact's toolbar
   *
   * @type {object}
   * @memberof module:src/components/uiComponents/AppTopbar
   * @inner
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
            <TimeFilter startDateEnable={startDateEnable}
              endDateEnable={endDateEnable}
              startDate={startDate}
              endDate={endDate}
              handleStartDateEnableChange={handleStartDateEnableChange}
              handleEndDateEnableChange={handleEndDateEnableChange}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange} />
          </Sidebar>

          <Button label={'Filter'} icon="pi pi-filter" className="p-mr-2" onClick={() => setVisible(true)} />
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