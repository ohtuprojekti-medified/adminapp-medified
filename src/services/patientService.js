import axios from 'axios'

// Tuotantoympäristössä api:n polku alkaa medified/...
const productionPath = process.env.NODE_ENV === 'production' ? 'medified/' : ''
const baseUrl = `http://localhost:5000/${productionPath}api`

const getAll = () => axios.get(`${baseUrl}/patients`).then(response => response.data)

export default { getAll }