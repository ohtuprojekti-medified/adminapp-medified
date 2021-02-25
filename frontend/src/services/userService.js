import axios from 'axios'

// Needed for production environment
const baseUrl = process.env.NODE_ENV === 'production'
  ? 'http://localhost:3000/medified/api'
  : 'http://localhost:5000/api'

let token = undefined

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(`${baseUrl}/users`, config)
  return response.data
}

export default { getAll, setToken }