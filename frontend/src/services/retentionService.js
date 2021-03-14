/**
 * Service for retrieving retention rate data from backend
 *
 * @module src/services/retentionService
 * @requires axios
 */
import axios from 'axios'

let token = undefined

/**
 * Sets Bearer for given token
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/userService
 * @inner
 * @param {string} newToken - Token from AWS
 */
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

/**
 * Sends a GET-request for retention rates
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/services/userService
 * @inner
 * @returns {Array} - Retention rates and average usage period in array
 */
const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.get('retention', config)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getAverage = async () => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.get('avgretention', config)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default { getAll, getAverage, setToken }