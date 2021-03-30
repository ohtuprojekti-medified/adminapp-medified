import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import loginService from '../../services/loginService'

const AppTopbar = ({ user, setUser }) => {

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

  const leftContents = (
    <React.Fragment>
      <h2 style={titleStyle}> Adminapp for monitoring moods </h2>
    </React.Fragment>
  )

  const rightContents = (
    <React.Fragment>
      {user
        ?
        <div>
          <Button label={user.username} icon="pi pi-user" className="p-mr-2" />
          <Button label="Log out" icon="pi pi-power-off" className="p-button-danger" onClick={handleLogOut}/>
        </div>
        :
        null}

    </React.Fragment>
  )

  return (
    <div className="p-component">
      <Toolbar left={leftContents} right={rightContents} />
    </div>
  )
}

export default AppTopbar