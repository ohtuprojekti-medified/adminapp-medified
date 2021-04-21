/**
 * Component for graphing weekly mood improvement
 *
 * @module src/components/WeeklyImprovement
 * @requires react
 * @requires primereact/chart
 * @exports WeeklyImprovement
 */
import React from 'react'
import { Chart } from 'primereact/chart'

/**
 * Component for graphing weekly mood improvement
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/components/WeeklyImprovement
 * @param {object} param0 - Object with weekly mood improvement
 * @param {Array} param0.weeklyImprovementAverages - list of mood averages and their weeks
 * @returns {object} - JSX component that creates a graph for average moods
 */
const WeeklyImprovement = ({ weeklyImprovementAverages }) => {
  const weeklyImprovementDataset = {
    label: 'mood improvement%',
    data: weeklyImprovementAverages === undefined || weeklyImprovementAverages === null ? []
      : [...weeklyImprovementAverages.map(entry => entry.average * 100)],
    backgroundColor: '#008000'
  }
  const moodChartData = {
    labels: weeklyImprovementAverages === undefined || weeklyImprovementAverages === null ? []
      : [...weeklyImprovementAverages.map(entry => new Date(entry.week[0]))],
    datasets: [weeklyImprovementDataset]
  }

  const chartOptions = {
    scales: {
      xAxes: [{
        type: 'time',
      }]
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
          <h3>WeeklyImprovement</h3>
          <Chart type='bar'
            data={moodChartData}
            options={chartOptions} />
        </div>
      </div>

    </div>

  )
}

export default WeeklyImprovement