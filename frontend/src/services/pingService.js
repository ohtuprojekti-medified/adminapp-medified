import { api } from '../apiConnection'

const securePing = async () => {
  try {
    const response = await api.get('ping')
    return response.status
  } catch (error) {
    console.log(error)
    return 403
  }
}

export default { securePing }