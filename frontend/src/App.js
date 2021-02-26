import './App.css'

import userService from './services/userService'
import React, { useEffect, useState } from 'react'
import Amplify from 'aws-amplify'
import Users from './components/Users'
import LoginForm from './components/LoginForm'



const App = () => {
  const [appUsers, setAppUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(undefined)

  // configure amplify authorization and check if user is logged in
  useEffect(() => {
    require('dotenv').config()
    Amplify.configure({
      Auth: {
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_WEB_CLIENT_ID,
        authenticationFlowType: process.env.REACT_APP_AUTHENTICATION_TYPE
      }
    })
    console.log(Amplify.configure())

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
  }, [])

  // set token for user service and GET data if user logs in or is logged in
  useEffect(() => {
    if (user) {
      userService.setToken(user.signInUserSession.idToken.jwtToken)
      userService.getAll().then(usersAtBeginning => setAppUsers(usersAtBeginning))
    }
  }, [user])

  return (
    <div className="App">
      {user ? <h3>{user.username} logged in</h3>
        : null
      }
      <h1>Adminapp for monitoring moods</h1>
      <LoginForm username={username} setUsername={setUsername} password={password}
        setPassword={setPassword} user={user} setUser={setUser} />
      {user ? <Users users={appUsers} />
        : null
      }
    </div>
  )}

export default App
