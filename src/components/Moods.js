import React from 'react'

const Moods = ({ moods }) =>
    <div>
        <h3>Mielialat listattuna</h3>
        <ul>{moods.map(mood => <li key={mood.id}><p>Mieliala {mood.title} on tasolla {mood.range}.</p></li>)}</ul>
    </div>

export default Moods