import React from 'react'
import AverageMoodWeekly from './AverageMoodWeekly'
import WeeklyImprovement from './WeeklyImprovement'
import TotalMoodImprovement from './TotalMoodImprovement'

const ImprovementsByDate = ({ moodAverages, totalImprovementAverages, weeklyImprovementAverages, byUsingPeriodFilter }) => {
  //handleByUsingPeriodChange,
  const centered = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    byUsingPeriodFilter === true
      ?
      <div>
        <div style={centered}>
          <AverageMoodWeekly moodAverages={moodAverages} byPeriod={byUsingPeriodFilter} />
        </div>
        <div style={centered}>
          <WeeklyImprovement weeklyImprovementAverages={weeklyImprovementAverages} byPeriod={byUsingPeriodFilter} />
        </div>
        <div style={centered}>
          <TotalMoodImprovement totalImprovementAverages={totalImprovementAverages} byPeriod={byUsingPeriodFilter} />
        </div>
      </div>
      :
      <div>
        <div style={centered}>
          <p> tähän nappula </p>
        </div>
        <div>
          <div style={centered}>
            <AverageMoodWeekly moodAverages={moodAverages} byPeriod={byUsingPeriodFilter} />
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