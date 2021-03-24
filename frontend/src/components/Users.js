/**
 * Component for users
 *
 * @module src/components/Users
 * @requires react
 * @requires src/components/Filter
 */
import React from 'react'
import Filter from './Filter'

/**
 * Component listing App users
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/components/Users
 * @inner
 * @param {object} param0 - Object with users
 * @param {Array} param0.users - Array of all users
 * @returns {object} - JSX component that counts amount of users
 */
const Users = ({ users, checked, handleFilterChange }) => {
  return (
    <div>
      <h3>App users</h3>
      <p>Application users: {users.length} </p>
      <Filter handleFilterChange={handleFilterChange} checked={checked} description='Show only app users with caregiver' />
    </div>
  )
}

export default Users

