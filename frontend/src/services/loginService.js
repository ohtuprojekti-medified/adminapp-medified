/**
 * Service for handling login with AWS Cognito
 *
 * @module src/services/loginService
 * @requires aws-amplify
 */
import { Auth } from 'aws-amplify'

/**
 * Logs user into AWS
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/loginService
 * @inner
 * @param {object} credentials - Contains username and password
 * @param {string} credentials.username - Username
 * @param {string} credentials.password - Password
 * @returns {*} - Logged user details
 */
const login = async credentials => {
  console.log(credentials.username)
  console.log(credentials.password)
  console.log(Auth.configure())
  let user
  try {
    user = await Auth.signIn(credentials.username, credentials.password)
  } catch (error) {
    console.log('error signing in', error)
  }
  return {
    user
  }
}

/**
 * Logs user out of AWS
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/loginService
 * @inner
 */
const logOut = async () => {
  try {
    Auth.signOut()
    window.localStorage.clear()
  } catch (error) {
    console.log('error signing out', error)
  }
}



export default { login, logOut }