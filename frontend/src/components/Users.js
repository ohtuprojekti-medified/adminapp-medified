import React from 'react'

// Component listing App users

const Users = ({ users }) => {
  return (
    <div>
      <h3>App users</h3>
      <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
  )
}

export default Users

