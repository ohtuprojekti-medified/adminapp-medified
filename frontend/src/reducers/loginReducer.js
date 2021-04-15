import loginService from '../services/loginService'
import dataService from '../services/dataService'
import Amplify from 'aws-amplify'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const initUser = () => {
  return async dispatch => {
    require('dotenv').config()
    Amplify.configure({
      Auth: {
        userPoolId: 'eu-west-1_sAj8nsLY6',
        userPoolWebClientId: '57bgrf7014uhtdu95jm8ci2ok5',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
      }
    })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dataService.setToken(loggedUser.idToken)
      dispatch({
        type: 'SET_USER',
        data: loggedUser
      })
    }
  }
}

export const handleLogout = () => {
  return async dispatch => {
    try {
      await loginService.logOut()
      dispatch({
        type: 'CLEAR_USER'
      })
    } catch (exception) {
      return
    }
  }
}

export const handleLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      const loggedUser = {
        username: user.username,
        idToken: user.signInUserSession.idToken.jwtToken,
        organisation: user.attributes['custom:organisation'],
        admin: user.attributes['custom:admin']
      }
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      dataService.setToken(loggedUser.idToken)
      dispatch({
        type: 'SET_USER',
        data: loggedUser
      })
    } catch (exception) {
      dispatch({
        type: 'CLEAR_USER'
      })
    }
  }
}

export const refreshToken = () => {
  return async dispatch => {
    try {
      await Amplify.Auth.currentSession()
      const cognitoUser = await Amplify.Auth.currentAuthenticatedUser()
      const refreshedUser = {
        username: cognitoUser.username,
        idToken: cognitoUser.signInUserSession.idToken.jwtToken,
        organisation: cognitoUser.attributes['custom:organisation'],
        admin: cognitoUser.attributes['custom:admin']
      }

      window.localStorage.setItem('loggedUser', JSON.stringify(refreshedUser))
      dataService.setToken(refreshedUser.idToken)
      dispatch({
        type: 'SET_USER',
        data: refreshedUser
      })
    } catch (exception) {
      dispatch({
        type: 'CLEAR_USER'
      })
    }
  }
}

export default loginReducer