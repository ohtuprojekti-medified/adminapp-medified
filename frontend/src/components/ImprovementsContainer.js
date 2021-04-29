import React from 'react'

import ImprovementsByDate from './ImprovementsByDate'
import ImprovementsByPeriod from './ImprovementsByPeriod'

import { ToggleButton } from 'primereact/togglebutton'

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