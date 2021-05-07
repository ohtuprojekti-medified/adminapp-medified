/**.
 * Component for graphing mood averages
 *
 * @module frontend/src/components/MoodAverage
 * @requires react
 * @requires primereact/chart
 * @exports MoodAverage
 */
import React from 'react'
import { Chart } from 'primereact/chart'

/**.
 * Component for graphing all new users, cumulative
 *
 * @constant
 * @function
 * @memberof module:frontend/src/components/MoodAverage
 * @param {*} param0 - Object with weekly cumulative users
 * @param {Array} param0.moodAverages - list of mood averages and their weeks
 * @param {boolean} param0.byPeriod - boolean value indicating whether data is shown byPeriod or ByDate
 * @returns {object} - JSX component that creates a graph for average moods
 */
const AverageMoodWeekly = ({ moodAverages, byPeriod }) => {
  const moodAverageDataset = {
    label: 'mood improvement',
    data: moodAverages === undefined || moodAverages === null ? []
      : [...moodAverages.map(entry => {
        if (entry.averages === null) {
          return null
        } else {
          return entry.averages[entry.averages.length - 1].average
        }
      })],
    backgroundColor: '#30C8BF'
  }

  let moodChartData, chartOptions
  if (byPeriod) {
    let labelText = []

    if (moodAverages !== null) {
      moodAverages.map(entry => {
        const week = 'week ' + entry.week[0]
        labelText = [...labelText, week]
      })
    }

    moodChartData = {
      labels: moodAverages === undefined || moodAverages === null ? []
        : labelText,
      datasets: [moodAverageDataset]
    }

    chartOptions = {
      scales: {
        xAxes: [{
          gridLines: {
            color: '#ffffff',
          }
        }]
      },
      animation: false
    }
  } else {
    moodChartData = {
      labels: moodAverages === undefined || moodAverages === null ? []
        : [...moodAverages.map(entry => new Date(entry.week[0]))],
      datasets: [moodAverageDataset]
    }

    chartOptions = {
      scales: {
        xAxes: [{
          type: 'time',
          gridLines: {
            color: '#ffffff',
          }
        }]
      },
      animation: false
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

export default AverageMoodWeekly
