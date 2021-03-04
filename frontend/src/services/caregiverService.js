/**
 * Service for retrieving caregiver data from backend
 *
 * @module src/services/caregiverService
 * @requires axios
 */
import axios from 'axios'

/**
 * Needed for production environment
 *
 * @type {string}
 * @memberof module:src/services/caregiverService
 * @inner
 */
const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://ohtup-staging.cs.helsinki.fi/medified/api' // STAGING
  : 'http://localhost:5000/api'

let token = undefined

/**
 * Sets Bearer for given token
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/caregiverService
 * @inner
 * @param {string} newToken - Token from AWS
 */
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

/**
 * Sends a GET-request for caregivers
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/caregiverService
 * @inner
 * @returns {Array} - All caregivers in array
 */
const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.get(`${baseUrl}/caregivers`, config)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }

}

export default { getAll, setToken }