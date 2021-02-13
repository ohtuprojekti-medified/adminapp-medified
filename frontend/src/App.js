import './App.css'

//import userService from './services/userService'
import React, { useEffect, useState } from 'react'
//import Users from './components/Users'
import Amplify from 'aws-amplify'
import Patients from './components/Patients'
import LoginForm from './components/LoginForm'
import patientService from './services/userService'


const App = () => {
  const [patients, setPatients] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(undefined)

  // GET patients-data when browser connects and configure amplify authorization
  useEffect(() => {
    patientService.getAll().then(patientsAtBeginning => setPatients(patientsAtBeginning))
    require('dotenv').config()
    Amplify.configure({
      Auth: {
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_WEB_CLIENT_ID,
        authenticationFlowType: process.env.REACT_APP_AUTHENTICATION_TYPE
      }
    })
    console.log(Amplify.configure())

  }, [])

  // User needs to be implemented for eslint
  user ? user : undefined

  return (
    <div className="App">
      {user ? <h3>{user.username} logged in</h3>
        : null
      }
      <h1>Adminapp for monitoring moods</h1>
      <LoginForm username={username} setUsername={setUsername} password={password}
        setPassword={setPassword} user={user} setUser={setUser} />
      {user ? <Patients patients={patients}/>
        : null
      }
    </div>
  )
}

export default App
