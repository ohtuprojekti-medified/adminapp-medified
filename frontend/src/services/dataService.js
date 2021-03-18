import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getConfig = () => ({
  headers: { Authorization: token }
})

const getAll = async (value) => {
  try {
    const response = await axios.get(value, getConfig())
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default { getAll, setToken }