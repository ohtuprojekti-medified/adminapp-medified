import React from 'react'

// Potilaan mielialat listaava komponentti
const Moods = ({ patientName, moods }) =>
    <div>
        <h4>{patientName}</h4>
        <ul>{moods.map(mood => <li key={mood.id}><p>Mieliala {mood.title} oli tasolla {mood.range}.</p></li>)}</ul>
    </div>

export default Moods