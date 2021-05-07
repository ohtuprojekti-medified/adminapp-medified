/**.
 * Component that creates a dropdown for selecting mood data type
 *
 * @module frontend/src/components/MoodFilter
 * @requires react
 * @requires primereact/dropdown
 * @exports MoodFilter
 */

import React from 'react'
import { Dropdown } from 'primereact/dropdown'

/**.
 * Component that creates a dropdown for selecting mood data type
 *
 * @constant
 * @function
 * @memberof module:frontend/src/components/MoodFilter
 * @param {*} param0 - Object with params
 * @param {string} param0.moodDataSelect - selected mood data type
 * @param {array} param0.moodGraphLabels -  array of possible mood data types
 * @param {Function} param0.handleMoodDataSelectChange - Event handler
 * @returns {object} - Dropdown menu with all the mood options
 */
const MoodFilter = ({ moodDataSelect, moodGraphLabels, handleMoodDataSelectChange }) => {
  const placeholder = moodDataSelect ? moodDataSelect : 'MOOD'
  const moodGraphLabelArray = moodGraphLabels.map(x => x.label)
  const setMoodGraph = (e) => {
    handleMoodDataSelectChange(e.value)
  }
  return (
    <div className="dropdown">
      <div className="card">
        <h3 style={{ color: '#1E968E' }}>Select mood data</h3>
        <Dropdown options={moodGraphLabelArray} onChange={setMoodGraph} placeholder={placeholder} />
      </div>
    </div>
  )
}
export default MoodFilter