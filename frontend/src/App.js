import './App.css'

import patientService from './services/patientService'
import React, { useEffect, useState } from 'react'
import Patients from './components/Patients'

const App = () => {
  const [patients, setPatients] = useState([])

  // GET patients-data when browser connects
  useEffect(() => patientService.getAll().then(patientsAtBeginning => setPatients(patientsAtBeginning)), [])

  return (
    <div className="App">
      <h1>Adminapp for monitoring moods</h1>
      <Patients patients={patients} />
    </div>
  )
}

export default App
