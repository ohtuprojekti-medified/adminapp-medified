/**
 * Service for retrieving cumulative user data from backend
 *
 * @module src/services/cumulativeService
 * @requires axios
 */
import API from '../api'

/**
 * Needed for production environment
 *
 * @type {string}
 * @memberof module:src/services/cumulativeService
 * @inner
 */


let token = undefined

/**
 * Sets Bearer for given token
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/cumulativeService
 * @inner
 * @param {string} newToken - Token from AWS
 */
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

/**
 * Sends a GET-request for cumulative users
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/cumulativeService
 * @inner
 * @returns {Array} - All cumulative users in array
 */
const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await API.get('/cumulative', config)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }

}

export default { getAll, setToken }