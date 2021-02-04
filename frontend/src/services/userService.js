import axios from 'axios'

// Needed for production environment
const productionPath = process.env.NODE_ENV === 'production' ? 'medified/' : ''
const baseUrl = `http://localhost:5000/${productionPath}api`


const getAll = async () => axios.get(`${baseUrl}/users`).then(response => response.data)

export default { getAll }