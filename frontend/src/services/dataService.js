/**.
 * Service for handling API connection
 *
 * @module src/services/dataService
 * @requires axios
 * @exports getAll
 * @exports setToken
 */
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/'
let token = null

/**.
 * Sets new token to axios config
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/dataService
 */
const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getConfig = () => ({
  headers: { Authorization: token }
})



/**.
 * Gets all data from given API endpoint
 *
 * @type {object}
 * @function
 * @async
 * @constant
 * @memberof module:src/services/dataService
 * @param {string} endpoint - API endpoint
 * @returns {*} - API response data
 */
const getAll = async (endpoint) => {
  try {
    const response = await axios.get(endpoint, getConfig())
    return response.data
  } catch (error) {
    if(error.message.includes('403')) {
      return 403
    }
    return []
  }
}

export default { getAll, setToken }