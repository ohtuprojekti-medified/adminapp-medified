import axios from 'axios'

let token = undefined

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/',
  token: token
})