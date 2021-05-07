/**.
 * Component for Organisations filter
 *
 * @module frontend/src/components/Organisation
 * @requires react
 * @requires primereact/dropdown
 * @exports Organisations
 */

import React from 'react'
import { Dropdown } from 'primereact/dropdown'

/**.
 * Component for selecting an organisation from all the organisations
 *
 * @constant
 * @function
 * @memberof module:frontend/src/components/Organisations
 * @param {*} param0 - Object with params
 * @param {Array} param0.organisations - Array of all organisations
 * @param {Function} param0.handleOrganisationChange - Eventhandler for organisation selector
 * @param {boolean} param0.organisationSelect - Organisation select value
 * @returns {object} - Dropdown menu with all the organisations
 */
const Organisations = ({ organisations, handleOrganisationChange, organisationSelect }) => {
  const placeholder = organisationSelect ? organisationSelect : 'ALL'
  const organisationArray = organisations.map(x => x.id)
  organisationArray.unshift('ALL')
  const setOrganisation = (e) => {
    handleOrganisationChange(e.value)
  }
  return (
    <div className="dropdown">
      <div className="card">
        <h5>Select Organisation</h5>
        <Dropdown options={organisationArray} onChange={setOrganisation} placeholder={placeholder} />
      </div>
    </div>
  )
}

export default Organisations