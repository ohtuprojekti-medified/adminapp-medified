// Muut mahdolliset teemat: saga ja arya, ja värit: orange, green, blue
import 'primereact/resources/themes/vela-purple/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import './App.css'

import userService from './services/userService'
import React, { useEffect, useState } from 'react'
import Users from './components/Users'

const App = () => {
  const [users, setUsers] = useState([])

  // Get users when browser connects
  useEffect(() => userService.getAll().then(usersAtBeginning => setUsers(usersAtBeginning)), [])

  return (
    <div className="App">
      <h1>Adminapp for monitoring moods</h1>
      <Users users={users} />
    </div>
  )
}

export default App
