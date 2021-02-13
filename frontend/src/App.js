import './App.css'

import userService from './services/userService'
import React, { useEffect, useState } from 'react'
<<<<<<< HEAD
import Users from './components/Users'
=======
import Amplify from 'aws-amplify'
import Patients from './components/Patients'
import LoginForm from './components/LoginForm'
>>>>>>> 84333b58712b246c980ff1e60af8a1d2ec23fc9d


const App = () => {
<<<<<<< HEAD
  const [users, setUsers] = useState([])

  // Get users when browser connects
  useEffect(() => userService.getAll().then(usersAtBeginning => setUsers(usersAtBeginning)), [])
=======
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
>>>>>>> 84333b58712b246c980ff1e60af8a1d2ec23fc9d

  // User needs to be implemented for eslint
  user ? user : undefined

  return (
    <div className="App">
<<<<<<< HEAD
      <h1>Admin app</h1>
      <Users users={users} />
=======
      {user ? <h3>{user.username} logged in</h3>
        : null
      }
      <h1>Adminapp for monitoring moods</h1>
      <LoginForm username={username} setUsername={setUsername} password={password}
        setPassword={setPassword} user={user} setUser={setUser} />
      {user ? <Patients patients={patients}/>
        : null
      }
>>>>>>> 84333b58712b246c980ff1e60af8a1d2ec23fc9d
    </div>
  )
}

export default App
