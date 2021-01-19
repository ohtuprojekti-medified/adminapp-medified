import axios from 'axios'

const baseUrl = "http://localhost:5000/api"

const get = () => axios.get(baseUrl).then(response => response.data)

export default { get }