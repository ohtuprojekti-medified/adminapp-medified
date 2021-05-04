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
        <h3 style={{ color: '#1E968E' }}>Select mood data</h3>
        <Dropdown options={moodGraphLabelArray} onChange={setMoodGraph} placeholder={placeholder} />
      </div>
    </div>
  )
}
export default MoodFilter