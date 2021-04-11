import React, { useState } from 'react'
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


const Organisations = () => {
  const [organisations, setOrganisations] = useState(null)
  // TÄMÄ ON VAIN MALLI
  const organisationList = [
    { name: 'Organisation1', code: 'C1' },
    { name: 'Organisation2', code: 'C2' },
    { name: 'Organisation3', code: 'C3' }
  ]

  // TÄHÄN BÄKKÄRISTÄ ASIAKKAIDEN HAKU
  // const organisationList2 = [
  //   for (var i=0; i < organisations.length; i++) {
  //     organisations[i].name
  //   }
  // ]

  const handleOrganisationChange = (e) => {
    setOrganisations(e.value)
  }
  return (
    <div className="dropdown">
      <div className="card">
        <h5>Select Organisation</h5>
        <Dropdown value={organisations} options={organisationList} onChange={handleOrganisationChange} optionLabel="name" placeholder="Select an Organisation" />
        {/* <Dropdown value={organisations} options={organisationList2} onChange={handleOrganisationChange} optionLabel="name" placeholder="Select an Organisation" /> */}
      </div>
    </div>
  )
}

export default Organisations