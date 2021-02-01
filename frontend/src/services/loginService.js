import axios from 'axios'

const productionPath = process.env.NODE_ENV === 'production' ? 'medified/' : ''
const baseUrl = `http://localhost:5000/${productionPath}api/login`

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }