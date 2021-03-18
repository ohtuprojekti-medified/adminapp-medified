/**
 * Service for retrieving user data from backend
 *
 * @module src/services/userService
 * @requires axios
 */
import { api } from '../apiConnection'

/**
 * Sends a GET-request for users
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/userService
 * @inner
 * @returns {Array} - All users in array
 */
const getAll = async () => {
  try {
    const response = await api.get('users')
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }

}

export default { getAll }