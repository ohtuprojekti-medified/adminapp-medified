/**
 * Component for retention rates
 *
 * @module src/components/RetentionRate
 * @requires react
 * @requires primereact/chart
 */

import React from 'react'
import { Chart } from 'primereact/chart'

const RetentionRate = ({ retentionRates, average }) => {

  const daysUsed = retentionRates.map(obj => obj.daysUsed)
  const data = [average, ...daysUsed]

  let labels = []
  for (let days of daysUsed) {
    labels = [...labels, days]
  }
  labels = ['Average', ...labels]

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
          max: 100,
          fontColor: '#454545'
        }
      }]
    }
  }

  const divStyle = {
    // position: 'relative',
    // height: '25vh',
    // width: '50vw'
  }

  const cardStyle = {
    // margin: '20px',
    // padding: '20px'
  }

  return (
    <div>
      <div className="card" style={cardStyle}>
        <h3>Retention rates</h3>
        <p>Average using period {parseFloat(average).toFixed(2)} days</p>
        <p><b>Average period and single periods:</b></p>
        <div className="chart-container" style={divStyle}>
          <Chart type="bar" data={barChart} options={options}></Chart>
        </div>
      </div>
    </div>
  )
}

export default RetentionRate