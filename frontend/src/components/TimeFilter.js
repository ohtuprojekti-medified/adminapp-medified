/**
 * Component for timeframe filtering
 *
 * @module src/components/TimeFilter
 * @requires react
 */
import React from 'react'

/**
 * This creates a JSX object that users can use to filter timeframe
 *
 * @param {*} param0 - Object with params
 * @returns {object} - JSX object
 */
const TimeFilter = ({ startDateEnable, endDateEnable, startDate, endDate, handleStartDateEnableChange,
  handleEndDateEnableChange, handleStartDateChange, handleEndDateChange }) => {
  const setStartDate = (e) => {
    handleStartDateChange(e.target.value)
  }
  const setEndDate = (e) => {
    handleEndDateChange(e.target.value)
  }
  return (
    <div>
      <form>
        <p><input type="date" data-testid="startDate-date" value={startDate} onChange={setStartDate}></input> Start date <input type="checkbox" data-testid="startDate-checkbox" checked={startDateEnable} onChange={handleStartDateEnableChange}></input></p>
        <p><input type="date" data-testid="endDate-date" value={endDate} onChange={setEndDate}></input> End date <input type="checkbox" data-testid="endDate-checkbox" checked={endDateEnable} onChange={handleEndDateEnableChange}></input></p>
      </form>
    </div>
  )
}

export default TimeFilter