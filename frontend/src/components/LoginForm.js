/**.
 * Component for login form
 *
 * @module src/components/LoginForm
 * @requires react
 * @requires primereact/inputtext
 * @requires primereact/password
 * @requires primereact/button
 * @requires src/services/loginService
 * @exports LoginForm
 */
import React from 'react'
import loginService from '../services/loginService'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'

/**.
 * Component that creates a form for login and button for logout
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/components/LoginForm
 * @param {object} param0 - Object with params
 * @param {string} param0.username - Value of username in form
 * @param {Function} param0.setUsername - Function to set the value of username
 * @param {string} param0.password - Value of password in form
 * @param {Function} param0.setPassword - Function to set the value of password
 * @param {object} param0.user - Object that contains details about current logged user
 * @param {Function} param0.setUser - Function that sets the value of user
 * @returns {object} - Form for login and button for logout in JSX
 */
const LoginForm = ({ username, setUsername, password, setPassword, user, setUser }) => {

  /**.
   * Handle login button presses
   *
   * @type {object}
   * @function
   * @constant
   * @memberof module:src/components/LoginForm
   * @inner
   * @param {object} event - Contains event
   */
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      if (user.user) {
        const appUser = {
          username: user.user.username,
          idToken: user.user.signInUserSession.idToken.jwtToken,
          organisation: user.user.attributes['custom:organisation'],
          admin: user.user.attributes['custom:admin']
        }
        setUser(appUser)
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(appUser)
        )
      } else {
        setUser(undefined)
      }
      setUsername('')
      setPassword('')
    } catch (exception) {
      return
    }
  }

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