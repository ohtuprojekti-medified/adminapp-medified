import axios from 'axios'

const baseUrl = 'http://localhost:5000/api'

const getAll = () => axios.get(`${baseUrl}/patients`).then(response => response.data)

export default { getAll }