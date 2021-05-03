/**.
 * Caregivers JSX component
 *
 * @module frontend/src/components/Caregivers
 * @requires react
 * @exports Caregivers
 */
import React from 'react'
import { Card } from 'primereact/card'

/**.
 * Component listing registered caregivers
 *
 * @name Caregivers
 * @function
 * @constant
 * @memberof module:frontend/src/components/Caregivers
 * @param {object} param0 - Object with params
 * @param {Array} param0.caregivers - Array of all caregivers
 * @returns {object} - JSX component that counts amount of caregivers
 */
const Caregivers = ({ caregivers }) => {
  return (
    <div className="p-col-12 p-md-6 p-xl-3">
      <Card title="Caregivers">
        <p>Registered caregivers: {caregivers.length} </p>
        <p></p>
      </Card>
    </div>
  )
}

export default Caregivers