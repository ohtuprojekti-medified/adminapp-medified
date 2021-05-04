/**.
 * Component containing improvement graphs byDate
 *
 * @module src/components/ImprovementsByDate
 * @requires react
 * @requires src/components/AverageMoodWeekly
 * @requires src/components/WeeklyImprovement
 * @requires src/components/TotalMoodImprovement
 * @exports ImprovementsByDate
 */
import React from 'react'
import AverageMoodWeekly from './AverageMoodWeekly'
import WeeklyImprovement from './WeeklyImprovement'
import TotalMoodImprovement from './TotalMoodImprovement'

/**.
 * Component containing improvement graphs byDate
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/components/ImprovementsByDate
 * @param {*} param0 - mood averages, weekly improvement averages, total improvement averages and byPeriod filter
 * @param {Array} param0.moodAverages - list of mood averages and weeks byDate
 * @param {Array} param0.totalImprovementAverages - list of total improvement averages and weeks byDate
 * @param {Array} param0.weeklyImprovementAverages - list of weekly improvement averages and weeks byDate
 * @param {boolean} param0.byUsingPeriodFilter - boolean value indicating whether data is shown byPeriod or ByDate
 */
const ImprovementsByDate = ({ moodAverages, totalImprovementAverages, weeklyImprovementAverages, byUsingPeriodFilter }) => {
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

export default ImprovementsByDate