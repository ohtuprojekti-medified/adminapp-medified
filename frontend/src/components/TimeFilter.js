/**.
 * Component for timeframe filtering
 *
 * @module src/components/TimeFilter
 * @requires react
 * @exports TimeFilter
 */
import React from 'react'
import { InputSwitch } from 'primereact/inputswitch'

/**.
 * This creates a JSX object that users can use to filter timeframe
 *
 * @constant
 * @function
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
        <h5>Start Date</h5>
        <div className="p-grid">
          <div className="p-col">
            <InputSwitch checked={startDateEnable} data-testid="startDate-checkbox" onChange={handleStartDateEnableChange} />
          </div>
          <div className="p-col">
            {startDateEnable ? (
              <input className="p-inputtext p-component" type="date" data-testid="startDate-date" value={startDate} onChange={setStartDate}></input>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <h5>End Date</h5>
        <div className="p-grid">
          <div className="p-col">
            <InputSwitch checked={endDateEnable} data-testid="endDate-checkbox" onChange={handleEndDateEnableChange} />
          </div>
          <div className="p-col">
            {endDateEnable ? (
              <input className="p-inputtext p-component" type="date" data-testid="startDate-date" value={endDate} onChange={setEndDate}></input>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default TimeFilter