/**.
 * Component for retention rates
 *
 * @module src/components/RetentionRate
 * @requires react
 * @requires primereact/chart
 * @exports RetentionRate
 */

import React from 'react'
import { Chart } from 'primereact/chart'

/**.
 * This creates a graph that shows the user retention rates and their average
 *
 * @constant
 * @function
 * @param {*} param0 - Contains retention rates as an array and average as integer
 * @returns {object} - JSX object
 */
const RetentionRate = ({ retentionRates, average }) => {

  const daysUsed = retentionRates.map(obj => obj.daysUsed)
  daysUsed.sort((a,b) => a - b)
  daysUsed.reverse()

  const data = [...daysUsed]

  let labels = []
  for (let days of daysUsed) {
    labels = [...labels, days]
  }

  const barChart = {
    labels: labels,
    datasets: [
      {
        label: 'usage periods',
        backgroundColor: '#2cbcc9',
        data: data
      }
    ]
  }

  const options = {
    legend: {
      labels: {
        fontColor: '#12708a'
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#454545'
        },
        width: '10px',
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 150,
          fontColor: '#454545'
        }
      }]
    }
  }

  const containerStyle = {
    backgroundColor: '#ffffff'
  }

  const cardStyle = {
    paddingTop: '5px',
    paddingBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px'
  }


  return (
    <div className="p-col-12 p-lg-8" >
      <div className="p-shadow-1" style={containerStyle}>
        <div className="card" style={cardStyle}>
          <h3>Retention rates</h3>
          <p> Average using period is {parseFloat(average).toFixed(2)} days</p>
          <p> Single periods:</p>
          <Chart type="bar" data={barChart} options={options}></Chart>

        </div>
      </div>
    </div>

  )
}

export default RetentionRate