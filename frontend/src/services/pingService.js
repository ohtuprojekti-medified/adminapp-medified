import axios from 'axios'

// Needed for production environment
const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://ohtup-staging.cs.helsinki.fi/medified/api' // STAGING
  : 'http://localhost:5000/api'

let token = undefined

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const securePing = async () => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.get(`${baseUrl}/ping`, config)
    console.log('responsee', response.status)
    return response.status
  } catch (error) {
    console.log(error)
    return []
  }

}

export default { securePing, setToken }