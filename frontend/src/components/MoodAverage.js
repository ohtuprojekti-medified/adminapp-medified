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
import { Dropdown } from 'primereact/dropdown'

/**
 * Component for graphing all new users, cumulative
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/components/MoodAverage
 * @param {object} param0 - Object with weekly cumulative users
 * @param {Array} param0.moodAverages - list of mood averages and their weeks
 * @param {Array} param0.BDIAverages- list of BDI averages and their weeks
 * @param {Array} param0.PHQ9Averages - list of PHQ9 averages and their weeks
 * @param {string} param0.moodGraph - String selector for mood graph
 * @param {object} param0.handleMoodGraphChange - Eventhandler for mood graph
 * @returns {object} - JSX component that creates a graph for average moods
 */
const MoodAverage = ({ moodAverages, BDIAverages, PHQ9Averages, moodGraph, handleMoodGraphChange }) => {
  let lastMoodAverage = 0
  let lastBDIAverage = 0
  let lastPHQ9Average = 0
  const moodAverageDataset = {
    label: 'mood improvement',
    data: moodAverages === undefined || moodAverages === null ? []
      : [...moodAverages.map(entry => {
        if (entry.average === null) {
          return lastMoodAverage
        } else {
          lastMoodAverage = entry.average[entry.average.length - 1]
          return entry.average[entry.average.length - 1]
        }
      })]
  }
  const BDIAverageDataset = {
    label: 'BDI improvement',
    data: BDIAverages === undefined || BDIAverages === null ? []
      : [...BDIAverages.map(entry => {
        if (entry.average === null) {
          return lastBDIAverage
        } else {
          lastBDIAverage = entry.average[entry.average.length - 1]
          return entry.average[entry.average.length - 1]
        }
      })
      ]
  }
  const PHQ9AverageDataset = {

    label: 'PHQ-9 improvement',
    data: PHQ9Averages === undefined || PHQ9Averages === null ? []
      : [...PHQ9Averages.map(entry => {
        if (entry.average === null) {
          return lastPHQ9Average
        } else {
          lastPHQ9Average = entry.average[entry.average.length - 1]
          return entry.average[entry.average.length - 1]
        }
      })
      ]
  }
  const moodChartData = {
    labels: moodAverages === undefined || moodAverages === null ? []
      : [...moodAverages.map(entry => new Date(entry.week[0]))],
    datasets: [moodAverageDataset]
  }
  const BDIChartData = {
    labels: BDIAverages === undefined || BDIAverages === null ? []
      : [...BDIAverages.map(entry => new Date(entry.week[0]))],
    datasets: [BDIAverageDataset]
  }
  const PHQ9ChartData = {
    labels: PHQ9Averages === undefined || PHQ9Averages === null ? []
      : [...PHQ9Averages.map(entry => new Date(entry.week[0]))],
    datasets: [PHQ9AverageDataset]
  }
  const chartData = {
    labels: [...moodAverages.map(entry => new Date(entry.week[0]))],
    datasets: [moodAverageDataset, BDIAverageDataset, PHQ9AverageDataset]
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

  const moodGraphs = [
    { label: 'ALL', chartData: chartData },
    { label: 'MOOD', chartData: moodChartData },
    { label: 'BDI', chartData: BDIChartData },
    { label: 'PHQ-9', chartData: PHQ9ChartData },

  ]

  const placeHolder = moodGraph ? moodGraph : moodGraphs[0].label

  const setMoodGraph = (e) => {
    handleMoodGraphChange(e.value)
  }

  return (

    <div className="p-col-12 p-lg-8">
      <div className="p-shadow-1" style={containerStyle}>
        <div className="card" style={cardStyle}>
          <h3>Mood average timeline</h3>
          <Dropdown
            options={moodGraphs.map(entry => entry.label)}
            onChange={setMoodGraph}
            label={placeHolder} />
          <Chart type='line'
            data={moodGraphs.filter(entry => entry.label === moodGraph)[0]}
            options={chartOptions} />
        </div>
      </div>

    </div>

  )
}

export default MoodAverage