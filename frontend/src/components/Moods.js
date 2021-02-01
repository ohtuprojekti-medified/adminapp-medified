import React from 'react'

// Lists moods for patients
const Moods = ({ patientName, moods }) =>
  <div>
    <h4>{patientName}</h4>
    <ul>{moods.map(mood => <li key={mood.id}><p>Mood {mood.title} was on level {mood.range}.</p></li>)}</ul>
  </div>

export default Moods