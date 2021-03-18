/**
 * Service for retrieving cumulative user data from backend
 *
 * @module src/services/cumulativeService
 * @requires axios
 */
import { api } from '../apiConnection'

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
  try {
    const response = await api.get('/cumulative')
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }

}

export default { getAll }