/**
 * Component for login form
 *
 * @module src/components/LoginForm
 * @requires react
 * @requires src/services/loginService
 */
import React from 'react'
import loginService from '../services/loginService'

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
 * @param {object} param0.user - Object that contains details about current logged user
 * @param {Function} param0.setUser - Function that sets the value of user
 * @returns {object} - Form for login and button for logout in JSX
 */
const LoginForm = ({ username, setUsername, password, setPassword, user, setUser }) => {

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
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      if (user.user) {
        const appUser = {
          username: user.user.username,
          idToken: user.user.signInUserSession.idToken.jwtToken
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
      console.log(exception)
    }
  }

  return (
    user
      ? null
      : <div>
        <h3>Login:</h3>
        <form onSubmit={handleLogin}>
          <div>username: <input id='username' type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)} /></div>
          <div>password: <input id='password' type='password' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)} /></div>
          <button type='submit'>login</button>
        </form>
      </div>
  )
}

export default LoginForm