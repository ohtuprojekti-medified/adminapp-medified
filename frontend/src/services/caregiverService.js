/**
 * Service for retrieving caregiver data from backend
 *
 * @module src/services/caregiverService
 * @requires axios
 */
import { api } from '../apiConnection'

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
  try {
    const response = await api.get('caregivers')
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }

}

export default { getAll }