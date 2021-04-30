/**.
 * Component for timeframe filtering
 *
 * @module src/components/TimeFilter
 * @requires react
 * @exports TimeFilter
 */
import React, { useState } from 'react'
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

  // const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)

  const setStartDate = (e) => {
    handleStartDateChange(e.target.value)
  }
  const setEndDate = (e) => {
    handleEndDateChange(e.target.value)
  }

  return (
    <div>
      <form>

        <div><h5>Start Date</h5><InputSwitch checked={startDateEnable} data-testid="startDate-checkbox" onChange={handleStartDateEnableChange} /></div>
        {/* <input type="checkbox" data-testid="startDate-checkbox" checked={startDateEnable} onChange={handleStartDateEnableChange}></input> */}
        <div>
          {startDateEnable ? (
            <p><input type="date" data-testid="startDate-date" value={startDate} onChange={setStartDate}></input></p>
          ) : (
            <div></div>
          )}
        </div>

        <div><h5>End Date</h5><InputSwitch checked={checked2} onChange={(e) => setChecked2(e.value)} /></div>
        <div>
          {checked2 ? (
            <p><input type="date" data-testid="endDate-date" value={endDate} onChange={setEndDate}></input> End date <input type="checkbox" data-testid="endDate-checkbox" checked={endDateEnable} onChange={handleEndDateEnableChange}></input></p>
          ) : (
            <div></div>
          )}
        </div>
      </form>
    </div>
  )
}

export default TimeFilter