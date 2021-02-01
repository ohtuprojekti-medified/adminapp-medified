import './App.css'

import patientService from './services/patientService'
import React, { useEffect, useState } from 'react'
import Patients from './components/Patients'
import LoginForm from './components/LoginForm'

const App = () => {
  const [patients, setPatients] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // GET patients-data when browser connects
  useEffect(() => patientService.getAll().then(patientsAtBeginning => setPatients(patientsAtBeginning)), [])

  // User needs to be implemented for eslint
  user ? user : null

  return (
    <div className="App">
      <h1>Adminapp for monitoring moods</h1>
      {user
        ? <Patients patients={patients} />
        : <LoginForm username={username} setUsername={setUsername} password={password}
          setPassword={setPassword} setUser={setUser} />
      }
    </div>
  )
}

export default App
