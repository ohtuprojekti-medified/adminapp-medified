/**
 * Component for graphing mood averages
 *
 * @module src/components/MoodAverage
 * @requires react
 * @requires primereact/chart
 * @exports MoodAverage
 */
import React from 'react'
import { Chart } from 'primereact/chart'

/**
 * Component for graphing all new users, cumulative
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/components/MoodAverage
 * @param {object} param0 - Object with weekly cumulative users
 * @param {Array} param0.moodAverages - list of mood averages and their weeks
 * @returns {object} - JSX component that creates a graph for average moods
 */
const MoodAverage = ({ moodAverages }) => {
  let lastMoodAverage = 0
  const moodAverageDataset = {
    label: 'mood improvement',
    data: moodAverages === undefined || moodAverages === null ? []
      : [...moodAverages.map(entry => {
        if (entry.averages === null) {
          return lastMoodAverage
        } else {
          lastMoodAverage = entry.averages[entry.averages.length - 1].average
          return entry.averages[entry.averages.length - 1].average
        }
      })],
    backgroundColor: '#FFC107'
  }
  const moodChartData = {
    labels: moodAverages === undefined || moodAverages === null ? []
      : [...moodAverages.map(entry => new Date(entry.week[0]))],
    datasets: [moodAverageDataset]
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
          <h3>Average mood weekly</h3>
          <Chart type='bar'
            data={moodChartData}
            options={chartOptions} />
        </div>
      </div>

    </div>

  )
}

export default MoodAverage