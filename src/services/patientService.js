import axios from 'axios'

// Tuotantoympäristössä api:n polku alkaa medified/...
const productionPath = process.env.NODE_ENV === 'production' ? 'medified/' : ''
const baseUrl = `http://localhost:5000/${productionPath}api`

const getAll = () => axios.get(`${baseUrl}/patients`).then(response => {
    console.log(process.env.NODE_ENV)
    return response.data
}).catch(error => console.log(process.env.NODE_ENV + error + baseUrl))

export default { getAll }