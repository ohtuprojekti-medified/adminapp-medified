import React from 'react'

import Moods from './Moods'

// List patients
const Patients = ({ patients }) =>
  <div>
    <h3>Potilaiden mielialat listattuna</h3>
    <ul>{patients.map(patient => <li key={patient.id}><Moods patientName={patient.name} moods={patient.moods} /></li>)}</ul>
  </div>

export default Patients