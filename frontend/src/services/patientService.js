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
  const response = await axios.get(`${baseUrl}/patients`, config)
  return response.data
}

//const getAll = () => axios.get(`${baseUrl}/patients`).then(response => response.data)

export default { getAll, setToken }