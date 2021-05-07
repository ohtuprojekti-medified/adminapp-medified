/**.
 * Component for users
 *
 * @module frontend/src/components/Users
 * @requires react
 * @requires primereact/card
 * @exports Users
 */
import React from 'react'
import { Card } from 'primereact/card'

/**.
 * Component listing App users
 *
 * @type {object}
 *
 * @constant
 * @memberof module:frontend/src/components/Users
 * @param {object} param0 - Object with users
 * @param {Array} param0.users - Array of all users
 * @returns {object} - JSX component that counts amount of users
 */
const Users = ({ users }) => {
  return (
    <div className="p-col-12 p-md-6 p-xl-3">
      <Card title="App users">
        <p>Application users: {users.length} </p>
      </Card>
    </div>
  )
}

export default Users