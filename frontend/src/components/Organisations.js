import React from 'react'
// import React from 'react'
import { Dropdown } from 'primereact/dropdown'

/**
 * Component for selecting an organisation from all the organisations
 *
 * @name Organisations
 * @function
 * @constant
 * @memberof module:src/components/Organisations
 * @inner
 * @param {object} param0 - Object with params
 * @param {Array} param0.organisations - Array of all organisations
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