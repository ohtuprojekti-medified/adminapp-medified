/**
 * Service for handling API connection
 *
 * @module src/services/dataService
 * @requires axios
 */
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/'
let token = null
let organisation = undefined

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

const setOrganisationRequest = organisationReq => {
  organisation = organisationReq
}

// organisation = 'OHTU'

const getConfig = () => ({
  headers: { Authorization: token,
    'Organisation-Requested': organisation }
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
    if(error.message.includes('403')) {
      return 403
    }
    return []
  }
}

export default { getAll, setToken, setOrganisationRequest }