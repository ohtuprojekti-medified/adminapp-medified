/**
 * Caregivers JSX component
 *
 * @module src/components/Caregivers
 * @requires react
 */
import React from 'react'

/**
 * Component listing registered caregivers
 *
 * @name Caregivers
 * @function
 * @constant
 * @memberof module:src/components/Caregivers
 * @inner
 * @param {object} param0 - Object with params
 * @param {Array} param0.caregivers - Array of all caregivers
 * @returns {object} - JSX component that counts amount of caregivers
 */
const Caregivers = ({ caregivers }) => {
  return (
    <div>
      <h3>Caregivers</h3>
      {/* <ul>{users.map(user => <li key={user.user_id}> {user.first_name} {user.last_name}</li>)}</ul> */}
      <p>Registered caregivers: {caregivers.length} </p>
    </div>
  )
}

export default Caregivers