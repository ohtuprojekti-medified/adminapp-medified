import React from 'react'

const TimeFilter = (startDateEnable, endDateEnable, startDate, endDate, handleStartDateEnableChange,
  handleEndDateEnableChange, handleStartDateChange, handleEndDateChange) => {
  return (
    <div>
      <p><input type="date" value={startDate} onChange={handleStartDateChange} /> Start date <input type="checkbox" checked={startDateEnable} onChange={handleStartDateEnableChange} /></p>
      <p><input type="date" value={endDate} onChange={handleEndDateChange} /> End date <input type="checkbox" checked={endDateEnable} onChange={handleEndDateEnableChange} /></p>
    </div>
  )
}

export default TimeFilter