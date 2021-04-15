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
  try {
    const user = await Auth.signIn(credentials.username, credentials.password)
    return user
  } catch (error) {
    return []
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
    await Auth.signOut()
    window.localStorage.clear()
  } catch (error) {
    return
  }
}



export default { login, logOut }