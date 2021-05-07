/**.
 * Component containing improvement graphs byPeriod
 *
 * @module src/components/ImprovementsByPeriod
 * @requires react
 * @requires src/components/AverageMoodWeekly
 * @requires src/components/WeeklyImprovement
 * @requires src/components/TotalMoodImprovement
 * @exports ImprovementsByPeriod
 */
import React from 'react'
import AverageMoodWeekly from './AverageMoodWeekly'
import WeeklyImprovement from './WeeklyImprovement'
import TotalMoodImprovement from './TotalMoodImprovement'

/**.
 * Component containing improvement graphs byPeriod
 *
 * @type {object}
 *
 * @constant
 * @memberof module:src/components/ImprovementsByPeriod
 * @param {*} param0 - mood averages, weekly improvement averages, total improvement averages and byPeriod filter
 * @param {Array} param0.moodAverages - list of mood averages and weeks byPeriod
 * @param {Array} param0.totalImprovementAverages - list of total improvement averages and weeks byPeriod
 * @param {Array} param0.weeklyImprovementAverages - list of weekly improvement averages and weeks byPeriod
 * @param {boolean} param0.byUsingPeriodFilter - boolean value indicating whether data is shown byPeriod or ByDate
 */
const ImprovementsByPeriod = ({ moodAverages, totalImprovementAverages, weeklyImprovementAverages, byUsingPeriodFilter }) => {
  const centered = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <div>
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
    </div>


  )
}

export default ImprovementsByPeriod