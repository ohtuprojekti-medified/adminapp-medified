import React from 'react'

import Moods from './Moods'

//Potilaat listaava komponentti
const Patients = ({ patients }) =>
    <div>
        <h3>Potilaiden mielialat listattuna</h3>
        <ul>{patients.map(patient => <Moods patientName={patient.name} moods={patient.moods} />)}</ul>
    </div>

export default Patients