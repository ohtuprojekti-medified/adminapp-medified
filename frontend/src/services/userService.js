import axios from 'axios'

// Needed for production environment
const productionPath = process.env.NODE_ENV === 'production' ? 'medified/' : ''
const baseUrl = `http://localhost:5000/${productionPath}api`

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