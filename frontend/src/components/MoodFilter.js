import React from 'react'
import { Dropdown } from 'primereact/dropdown'

const MoodFilter = ({ moodGraph, moodGraphLabels, handleMoodGraphChange }) => {
  const placeholder = moodGraph ? moodGraph : 'MOOD'
  const moodGraphLabelArray = moodGraphLabels.map(x => x.label)
  const setMoodGraph = (e) => {
    handleMoodGraphChange(e.value)
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