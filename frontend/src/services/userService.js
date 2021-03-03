import axios from 'axios'

// Needed for production environment
const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://ohtup-staging.cs.helsinki.fi/medified/api' // STAGING
  : 'http://localhost:5000/api'

let token = undefined

/**
 * Sets Bearer for given token
 *
 * @param {string} newToken - Token from AWS
 */
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

/**
 * Sends a GET-request for users
 *
 * @returns {Array} - All users in array
 */
const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.get(`${baseUrl}/users`, config)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }

}

export default { getAll, setToken }