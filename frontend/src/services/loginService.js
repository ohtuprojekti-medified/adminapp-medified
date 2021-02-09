//import axios from 'axios'

// Needed for production environment
//const productionPath = process.env.NODE_ENV === 'production' ? 'medified/' : ''
//const loginUrl = `http://localhost:5000/${productionPath}api/login`
//const logOutUrl = `http://localhost:5000/${productionPath}api/logout`

const login = async credentials => {
  // Backend response needed
  //const response = await axios.post(loginUrl, credentials)
  //return response.data
  console.log(credentials)
  return {
    token: 'Test token',
    username: 'Username'
  }
}

const logOut = async () => {
  // Bacend response needed
  //const response = await axios.post(logOutUrl)
  //return response.data
  console.log('logged out')
}

export default { login, logOut }