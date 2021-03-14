import axios from 'axios'

let token = undefined

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const securePing = async () => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.get('ping', config)
    return response.status
  } catch (error) {
    console.log(error)
    return 403
  }

}

export default { securePing, setToken }