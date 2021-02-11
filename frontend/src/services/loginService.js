import { Auth } from 'aws-amplify'

const login = async credentials => {
  console.log(credentials.username)
  console.log(credentials.password)
  console.log(Auth.configure())
  let user
  try {
    user = await Auth.signIn(credentials.username, credentials.password)
  } catch (error) {
    console.log('error signing in', error)
  }
  return {
    user
  }
}

const logOut = async () => {
  try {
    Auth.signOut()
  } catch (error) {
    console.log('error signing out', error)
  }
}



export default { login, logOut }