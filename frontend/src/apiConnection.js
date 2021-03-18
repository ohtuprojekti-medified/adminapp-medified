import axios from 'axios'

export const setApiToken = newToken => {
  api.defaults.headers.common = { 'Authorization': `Bearer ${newToken}` }
}

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/',
})
