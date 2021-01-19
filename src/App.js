import logo from './logo.svg';
import './App.css';

import patientService from './services/patientService'
import { useEffect, useState } from 'react';
import Patients from './components/Patients';

const App = () => {
  const [patients, setPatients] = useState([])

  // Potilastietojen haku selaimen yhdistaessa
  useEffect(() => patientService.getAll().then(patientsAtBeginning => setPatients(patientsAtBeginning)), [])

  return (
    <div className="App">
      <h1>Adminsovellus mielialan seurantaan</h1>
      <Patients patients={patients} />
    </div>
  );
}

export default App;
