import React from 'react'
import { Dropdown } from 'primereact/dropdown'

const MoodFilter = ({ moodDataSelect, moodGraphLabels, handleMoodDataSelectChange }) => {
  const placeholder = moodDataSelect ? moodDataSelect : 'MOOD'
  const moodGraphLabelArray = moodGraphLabels.map(x => x.label)
  const setMoodGraph = (e) => {
    handleMoodDataSelectChange(e.value)
  }
  return (
    <div className="dropdown">
      <div className="card">
        <h5>Select mood data</h5>
        <Dropdown options={moodGraphLabelArray} onChange={setMoodGraph} placeholder={placeholder} />
      </div>
    </div>
  )
}
export default MoodFilter