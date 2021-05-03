/**.
 * Component for graphing weekly mood improvement
 *
 * @module frontend/src/components/WeeklyImprovement
 * @requires react
 * @requires primereact/chart
 * @exports WeeklyImprovement
 */
import React from 'react'
import { Chart } from 'primereact/chart'

/**.
 * Component for graphing weekly mood improvement
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:frontend/src/components/WeeklyImprovement
 * @param {object} param0 - Object with weekly mood improvement
 * @param {Array} param0.weeklyImprovementAverages - list of mood averages and their weeks
 * @param {boolean} param0.byPeriod - boolean value indicating whether data is shown byPeriod or ByDate
 * @returns {object} - JSX component that creates a graph for average moods
 */
const WeeklyImprovement = ({ weeklyImprovementAverages, byPeriod }) => {
  const weeklyImprovementDataset = {
    label: 'mood improvement%',
    data: weeklyImprovementAverages === undefined || weeklyImprovementAverages === null ? []
      : [...weeklyImprovementAverages.map(entry => entry.average * 100)],
    backgroundColor: '#008000'
  }
  let moodChartData, chartOptions

  if (byPeriod) {
    let labelText = []
    weeklyImprovementAverages.map(entry => {
      const week = 'week ' + entry.week[0]
      labelText = [...labelText, week]
    })
    moodChartData = {
      labels: weeklyImprovementAverages === undefined || weeklyImprovementAverages === null ? []
        : labelText,
      datasets: [weeklyImprovementDataset]
    }
    chartOptions = {}
  } else {
    moodChartData = {
      labels: weeklyImprovementAverages === undefined || weeklyImprovementAverages === null ? []
        : [...weeklyImprovementAverages.map(entry => new Date(entry.week[0]))],
      datasets: [weeklyImprovementDataset]
    }

    chartOptions = {
      scales: {
        xAxes: [{
          type: 'time',
        }]
      }
    }
  }


  const containerStyle = {
    backgroundColor: '#ffffff',
    marginBottom: '20px'
  }

  const cardStyle = {
    paddingTop: '5px',
    paddingBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px'
  }

  return (

    <div className="p-col-12 p-lg-8">
      <div className="p-shadow-1" style={containerStyle}>
        <div className="card" style={cardStyle}>
          <h3>Weekly Improvement</h3>
          <Chart type='bar'
            data={moodChartData}
            options={chartOptions} />
        </div>
      </div>

    </div>

  )
}

export default WeeklyImprovement