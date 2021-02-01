//import axios from 'axios'

// Needed for production environment
//const productionPath = process.env.NODE_ENV === 'production' ? 'medified/' : ''
//const baseUrl = `http://localhost:5000/${productionPath}api/login`

const login = async credentials => {
  // Backend response needed
  //const response = await axios.post(baseUrl, credentials)
  //return response.data
  console.log(credentials)
  return {
    token: 'Test token',
    username: 'Username'
  }
}

export default { login }