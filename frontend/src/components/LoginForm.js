/**
 * Component for login form
 *
 * @module src/components/LoginForm
 * @requires react
 * @requires src/services/loginService
 */
import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'

/**
 * Component that creates a form for login and button for logout
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/components/LoginForm
 * @inner
 * @param {object} param0 - Object with params
 * @param {string} param0.username - Value of username in form
 * @param {Function} param0.setUsername - Function to set the value of username
 * @param {string} param0.password - Value of password in form
 * @param {Function} param0.setPassword - Function to set the value of password
 * @param {object} param0.user - User details
 * @param {Function} param0.handleLogin - Event handler for login
 * @returns {object} - Form for login and button for logout in JSX
 */
const LoginForm = ({ username, setUsername, password, setPassword, user, handleLogin }) => {

  const containerStyle = {
    position: 'relative',
    top: '2vh',
    right: '-3vh',
    width: '35vh',
    height: '30vh'
  }

  return (
    user
      ? null
      : <div style={containerStyle}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <div>
              username:
              <InputText id="username" type="text" value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
              password:
              <Password id="password" value={password} feedback={false} name="Password" onChange={({ target }) => setPassword(target.value)} />
            </div>
          </div>
          <Button label="login" type='submit' />
        </form>
      </div>
  )
}

export default LoginForm

{/* <input id='username' type='text' value={username} name='Username'
onChange={({ target }) => setUsername(target.value)} /> */}

{/* <div>password: <input id='password' type='password' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)} /></div> */}