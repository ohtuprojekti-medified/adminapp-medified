/**.
 * Component for applications UI topbar
 *
 * @module frontend/src/components/uiComponents/AppTopbar
 * @requires react
 * @requires primereact/toolbar
 * @requires primereact/button
 * @requires frontend/src/services/loginService
 * @requires frontend/src/components/uiComponents/AppHeader
 * @requires frontend/src/components/Filter
 * @requires frontend/src/components/TimeFilter
 * @requires frontend/src/components/Organisations
 * @exports AppTopbar - Page topbar
 */
import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import Filter from '../Filter'
import TimeFilter from '../TimeFilter'
import MoodFilter from '../MoodFilter'
import Organisations from '../Organisations'
import loginService from '../../services/loginService'

import Header from './AppHeader'

/**.
 * Component for applications UI topbar
 *
 * @memberof module:frontend/src/components/uiComponents/AppTopbar
 * @param {*} param0 - all props from App.js
 * @returns {object} - JSX Topbar component
 */
const AppTopbar = ({ user, setUser, caregiverFilterForAllUsers, handleFilterChange,
  visible, setVisible, organisations, handleOrganisationChange, organisationSelect,
  startDateEnable, endDateEnable, startDate, endDate, handleStartDateEnableChange,
  handleEndDateEnableChange, handleStartDateChange, handleEndDateChange,
  moodDataSelect, moodGraphLabels, handleMoodDataSelectChange }) => {

  /**.
   * Handle logout button presses
   *
   * @type {object}
   * @function
   * @constant
   * @memberof module:frontend/src/components/uiComponents/AppTopbar
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
    // backgroundColor: '#FF7F50'
  }

  /**.
   * Contents for the left side of primereact's toolbar
   *
   * @type {object}
   * @memberof module:frontend/src/components/uiComponents/AppTopbar
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
   * @memberof module:frontend/src/components/uiComponents/AppTopbar
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
            <MoodFilter
              moodDataSelect={moodDataSelect}
              moodGraphLabels={moodGraphLabels}
              handleMoodDataSelectChange={handleMoodDataSelectChange} />
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