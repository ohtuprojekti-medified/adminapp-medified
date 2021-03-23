/**
 * Service for handling API connection
 *
 * @module src/services/dataService
 * @requires axios
 */
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/'
let token = null

/**
 * Sets new token to axios config
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/dataService
 * @inner
 */
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getConfig = () => ({
  headers: { Authorization: token }
})

/**
 * Gets all data from given API endpoint
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/dataService
 * @inner
 * @param {string} endpoint - API endpoint
 * @returns {*} - API response data
 */
const getAll = async (endpoint) => {
  try {
    const response = await axios.get(endpoint, getConfig())
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default { getAll, setToken }