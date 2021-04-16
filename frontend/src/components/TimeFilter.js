import React from 'react'

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
      <p><input type="date" value={startDate} onChange={setStartDate} /> Start date <input type="checkbox" checked={startDateEnable} onChange={handleStartDateEnableChange} /></p>
      <p><input type="date" value={endDate} onChange={setEndDate} /> End date <input type="checkbox" checked={endDateEnable} onChange={handleEndDateEnableChange} /></p>
    </div>
  )
}

export default TimeFilter