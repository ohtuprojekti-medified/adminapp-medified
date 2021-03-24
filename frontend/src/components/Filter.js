import React from 'react'

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
const Filter = ({ description, checked, handleFilterChange }) => {
  return (
    <div>
      <form>
        <p><input type="checkbox" checked={checked} onChange={handleFilterChange}></input> {description}</p>
      </form>
    </div>
  )
}

export default Filter
