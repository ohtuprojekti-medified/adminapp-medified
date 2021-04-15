/**
 * Component for login form
 *
 * @module src/components/LoginForm
 * @requires react
 * @requires src/services/loginService
 */
import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/loginReducer'

/**
 * Component that creates a form for login and button for logout
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/components/LoginForm
 * @inner
 * @returns {object} - Form for login and button for logout in JSX
 */
const LoginForm = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()

  /**
   * Handle login button presses
   *
   * @type {object}
   * @function
   * @constant
   * @memberof module:src/components/LoginForm
   * @inner
   * @param {object} event - Contains event
   */
  const loginUser = async (event) => {
    event.preventDefault()
    dispatch(handleLogin(username, password))
    setUsername('')
    setPassword('')
  }

  const containerStyle = {
    position: 'relative',
    top: '2vh',
    right: '-3vh',
    width: '35vh',
    height: '30vh'
  }

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <div>
          <div>
              username:
            <InputText id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
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