/**.
 * Service for handling login with AWS Cognito
 *
 * @module src/services/loginService
 * @requires aws-amplify
 * @exports login
 * @exports logOut
 */
import { Auth } from 'aws-amplify'

/**.
 * Logs user into AWS
 *
 * @type {object}
 * @function
 * @async
 * @constant
 * @memberof module:src/services/loginService
 * @param {object} credentials - Contains username and password
 * @param {string} credentials.username - Username
 * @param {string} credentials.password - Password
 * @returns {*} - Logged user details
 */
const login = async credentials => {
  let user
  try {
    user = await Auth.signIn(credentials.username, credentials.password)
  } catch (error) {
    return []
  }
  return {
    user
  }
}

/**.
 * Logs user out of AWS
 *
 * @type {object}
 * @function
 * @async
 * @constant
 * @memberof module:src/services/loginService
 */
const logOut = async () => {
  try {
    Auth.signOut()
    window.localStorage.clear()
  } catch (error) {
    return
  }
}



export default { login, logOut }