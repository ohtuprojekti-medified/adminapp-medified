/**.
 * Component containing byPeriod or byDate improvement graphs and toggling button
 *
 * @module frontend/src/components/ImprovementContainer
 * @requires React
 * @requires primereact/togglebutton
 * @requires frontend/src/components/ImprovementsByDate
 * @requires frontend/src/components/ImprovementsByPeriod
 * @exports ImprovementContainer
 */
import React from 'react'
import ImprovementsByDate from './ImprovementsByDate'
import ImprovementsByPeriod from './ImprovementsByPeriod'
import { ToggleButton } from 'primereact/togglebutton'

/**.
 * Component containing byPeriod or byDate improvement graphs
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:frontend/src/components/ImprovementContainer
 * @param {object} param0 - Object containing mood avreages, total improvement averages and weekly improvement averages, both byPeriod and byDate and filter value and change-function
 * @param {Array} param0.moodAverages - list of mood averages and weeks byDate
 * @param {Array} param0.totalImprovementAverages - list of total improvement averages and weeks byDate
 * @param {Array} param0.weeklyImprovementAverages - list of weekly improvement averages and weeks byDate
 * @param {boolean} param0.byUsingPeriodFilter - boolean value indicating whether data is shown byPeriod or ByDate
 * @param {*} param0.handleByUsingPeriodChange - function handling byPeriod changes
 * @param {Array} param0.moodChartDataByPeriod - list of mood averages and weeks byPeriod
 * @param {Array} param0.totalImprovementAveragesByPeriod - list of total improvement averages and weeks byPeriod
 * @param {Array} param0.weeklyImprovementAveragesByPeriod - list of weekly improvement averages and weeks byPeriod
 */
const ImprovementContainer = ({ moodAverages, totalImprovementAverages, weeklyImprovementAverages, byUsingPeriodFilter, handleByUsingPeriodChange, moodChartDataByPeriod, weeklyImprovementAveragesByPeriod, totalImprovementAveragesByPeriod }) => {
  const centered = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  let value
  const setValue = (valueToBeSetted) => {
    handleByUsingPeriodChange()
    value = valueToBeSetted
    return value
  }
  return (
    <div>
      <div style={centered}>
        <ToggleButton offLabel="by using period" onLabel="by calendar weeks" onIcon="pi pi-calendar-plus" offIcon="pi pi-calendar-minus" onChange={(e) => setValue(e.value)} checked={!byUsingPeriodFilter} />
      </div>
      {byUsingPeriodFilter === true
        ? <ImprovementsByPeriod moodAverages={moodChartDataByPeriod} totalImprovementAverages={totalImprovementAveragesByPeriod} weeklyImprovementAverages={weeklyImprovementAveragesByPeriod} byUsingPeriodFilter={byUsingPeriodFilter} />
        : <ImprovementsByDate moodAverages={moodAverages} totalImprovementAverages={totalImprovementAverages} weeklyImprovementAverages={weeklyImprovementAverages} byUsingPeriodFilter={byUsingPeriodFilter} />
      }
    </div>
  )

}

export default ImprovementContainer