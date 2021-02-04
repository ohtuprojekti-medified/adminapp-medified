import './App.css'

import userService from './services/userService'
import React, { useEffect, useState } from 'react'
import Users from './components/Users'

const App = () => {
  const [users, setUsers] = useState([])

  // Get users when browser connects
  useEffect(() => userService.getAll().then(usersAtBeginning => setUsers(usersAtBeginning)), [])

  // User needs to be implemented for eslint
  user ? user : null

  return (
    <div className="App">
      <h1>Admin app</h1>
      <Users users={users} />
    </div>
  )
}

export default App
