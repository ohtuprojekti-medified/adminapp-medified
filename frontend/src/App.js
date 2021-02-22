import './App.css'

import patientService from './services/patientService'
import React, { useEffect, useState } from 'react'
import Amplify from 'aws-amplify'
import Patients from './components/Patients'
import LoginForm from './components/LoginForm'


const App = () => {
  const [patients, setPatients] = useState([])
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

  // set token for patient service and GET patients-data if user logs in or is logged in
  useEffect(() => {
    if (user) {
      patientService.setToken(user.signInUserSession.idToken.jwtToken)
      patientService.getAll().then(patientsAtBeginning => setPatients(patientsAtBeginning))
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
      {user ? <Patients patients={patients} />
        : null
      }
    </div>
  )
}

export default App
