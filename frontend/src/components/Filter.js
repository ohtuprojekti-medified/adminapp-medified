import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'

/**
 * Component that creates a checkbox that can be used for filtering
 *
 * @type {object}
 * @memberof module:src/components/Filter
 * @param {object} param0 - Object with params
 * @param {string} param0.description - Description of the filter
 * @param {boolean} param0.checked -  Boolean value of the checkbox
 * @param {Function} param0.handleFilterChange - Event handler
 * @returns {object} - A checkbox element
 */

const DropdownList = () => {
  const [clients, setClients] = useState(null)
  // TÄHÄN BÄKKÄRISTÄ ASIAKKAIDEN HAKU
  const clientList = [
    { name: 'Client1', code: 'C1' },
    { name: 'Client2', code: 'C2' },
    { name: 'Client3', code: 'C3' }
  ]

  const onClientChange = (e) => {
    setClients(e.value)
  }
  return (
    <div className="dropdown-demo">
      <div className="card">
        <h5>Select client</h5>
        <Dropdown value={clients} options={clientList} onChange={onClientChange} optionLabel="name" placeholder="Select a Client" />
      </div>
    </div>
  )
}

const Filter = ({ description, checked, handleFilterChange }) => {
  return (
    <div>
      <form>
        <p><input type="checkbox" data-testid="filter-checkbox" checked={checked} onChange={handleFilterChange}></input> {description}</p>
      </form>
      <div>
        <DropdownList/>
      </div>
    </div>
  )
}

export default Filter
