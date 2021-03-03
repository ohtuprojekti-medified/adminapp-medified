// Muut mahdolliset teemat: saga ja arya, ja värit: orange, green, blue
import 'primereact/resources/themes/vela-purple/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import './App.css'

import userService from './services/userService'
import caregiverService from './services/caregiverService'
import React, { useEffect, useState } from 'react'
import Amplify from 'aws-amplify'
import Users from './components/Users'
import Caregivers from './components/Caregivers'
import LoginForm from './components/LoginForm'


/**
 * Creates a single page application
 *
 * @returns {object} - A single page application in JSX
 */
const App = () => {
  const [appUsers, setAppUsers] = useState([])
  const [caregivers, setCaregivers] = useState([])
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
      caregiverService.setToken(user.signInUserSession.idToken.jwtToken)
      caregiverService.getAll().then(caregivs => setCaregivers(caregivs))
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
      {user
        ?
        <div>
          <Users users={appUsers} />
          <Caregivers caregivers={caregivers} />
        </div>
        :
        null
      }
    </div>
  )
}

export default App
