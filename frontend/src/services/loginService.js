import { Auth } from 'aws-amplify'

/**
 * Logs user into AWS
 *
 * @param {*} credentials - Contains username and password
 * @returns {*} - Logged user details
 */
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

/**
 * Logs user out of AWS
 */
const logOut = async () => {
  try {
    Auth.signOut()
    window.localStorage.clear()
  } catch (error) {
    console.log('error signing out', error)
  }
}



export default { login, logOut }