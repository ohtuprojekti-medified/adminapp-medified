/**
 * Component for graphing all new users, cumulative
 *
 * @module src/components/Cumulative
 * @requires react
 * @requires primereact/chart
 */
import React from 'react'
import { Chart } from 'primereact/chart'

/**
 * Component for graphing all new users, cumulative
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/components/Cumulative
 * @inner
 * @param {object} param0 - Object with weekly cumulative users
 * @param {Array} param0.cumulative - Array of all cumulative users
 * @param {Array} param0.activeUsers - Array of all active users
 * @returns {object} - JSX component that lists amount of new users in a cumulative manner
 */
const Cumulative = ({ cumulative, activeUsers }) => {
  if (cumulative.length === 0) {
    return null
  }
  console.log(cumulative, activeUsers)

  const chartData = {
    labels: [...cumulative.map(entry => new Date(entry.week[0]))],
    datasets: [
      {
        data: [...cumulative.map(entry => entry.entries)]
      },
      {
        data: [...activeUsers.map(entry => entry.entries)]
      }
    ]
  }

  const chartOptions = {
    scales: {
      xAxes: [{
        type: 'time',
      }]
    }
  }

  return (
    <div>
      <h3>New users, cumulative</h3>
      <Chart type='line' data={chartData} options={chartOptions} />
    </div>
  )
}

export default Cumulative

