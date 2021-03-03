import React from 'react'

/**
 * Component listing App users
 *
 * @param {object} param0 - Object with users
 * @param {Array} param0.users - Array of all users
 * @returns {object} - JSX component that counts amount of users
 */
const Users = ({ users }) => {
  return (
    <div>
      <h3>App users</h3>
      {/* <ul>{users.map(user => <li key={user.user_id}> {user.first_name} {user.last_name}</li>)}</ul> */}
      <p>Application users: {users.length} </p>
    </div>
  )
}

export default Users

