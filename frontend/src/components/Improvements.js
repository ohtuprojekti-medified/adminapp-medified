import React from 'react'
import AverageMoodWeekly from './AverageMoodWeekly'
import WeeklyImprovement from './WeeklyImprovement'
import TotalMoodImprovement from './TotalMoodImprovement'

const ImprovementsByDate = ({ moodAverages, totalImprovementAverages, weeklyImprovementAverages }) => {

  const centered = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <div>
      <div style={centered}>
        <p> tähän nappula </p>
      </div>
      <div>
        <div style={centered}>
          <AverageMoodWeekly moodAverages={moodAverages} />
        </div>
        <div style={centered}>
          <WeeklyImprovement weeklyImprovementAverages={weeklyImprovementAverages} />
        </div>
        <div style={centered}>
          <TotalMoodImprovement totalImprovementAverages={totalImprovementAverages} />
        </div>
      </div>
    </div>
  )
}

export default ImprovementsByDate