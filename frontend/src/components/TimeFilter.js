import React from 'react'

const TimeFilter = ({ startDateEnable, endDateEnable, startDate, endDate, handleStartDateEnableChange,
  handleEndDateEnableChange, handleStartDateChange, handleEndDateChange }) => {
  const setStartDate = (e) => {
    handleStartDateChange(e.target.valueAsDate)
  }
  const setEndDate = (e) => {
    handleEndDateChange(e.target.valueAsDate)
  }
  return (
    <div>
      <p><input type="date" value={startDate} onChange={setStartDate} /> Start date <input type="checkbox" checked={startDateEnable} onChange={handleStartDateEnableChange} /></p>
      <p><input type="date" value={endDate} onChange={setEndDate} /> End date <input type="checkbox" checked={endDateEnable} onChange={handleEndDateEnableChange} /></p>
    </div>
  )
}

export default TimeFilter