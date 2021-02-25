import axios from 'axios'

// Needed for production environment
const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://ohtup-staging.cs.helsinki.fi/medified/api' // STAGING
  : 'http://localhost:5000/api'


const getAll = async () => axios.get(`${baseUrl}/users`).then(response => response.data)

export default { getAll }