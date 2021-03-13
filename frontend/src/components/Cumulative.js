/**
 * Component for all new users, cumulative
 *
 * @module src/components/Cumulative
 * @requires react
 */
import React from 'react'
import { Chart } from 'primereact/chart'

/**
 * Component listing all new users, cumulative
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/components/Cumulative
 * @inner
 * @param {object} param0 - Object with weekly cumulative users
 * @param {Array} param0.cumulative - Array of all cumulative users
 * @returns {object} - JSX component that lists amount of new users in a cumulative manner
 */

const Cumulative = ({ cumulative }) => {
  if (cumulative.length === 0) {
    return null
  }

  const chartData = {
    labels: [...cumulative.map(entry => new Date(entry.week[0]))],
    datasets: [
      {
        data: [...cumulative.map(entry => entry.entries )]
      }
    ]
  }

  const chartOptions ={
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

