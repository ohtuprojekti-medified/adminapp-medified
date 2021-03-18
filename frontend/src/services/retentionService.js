/**
 * Service for retrieving retention rate data from backend
 *
 * @module src/services/retentionService
 * @requires axios
 */
import { api } from '../apiConnection'

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
  try {
    const response = await api.get('retention')
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getAverage = async () => {
  try {
    const response = await api.get('avgretention')
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default { getAll, getAverage }