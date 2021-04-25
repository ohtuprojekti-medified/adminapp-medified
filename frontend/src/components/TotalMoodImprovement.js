/**.
 * Component for total mood improvement
 *
 * @module src/components/TotalMoodImprovement
 * @requires react
 * @requires primereact/chart
 * @exports TotalImprovement
 */
import React from 'react'
import { Chart } from 'primereact/chart'

/**.
 * Component for graphing total mood improvement
 *
 * @type {object}
 * @function
 * @constant
 * @memberof module:src/components/TotalMoodImprovement
 * @param {object} param0 - Object with total mood improvement
 * @param {Array} param0.totalImprovementAverages - list of mood averages and their weeks
 * @returns {object} - JSX component that creates a graph for average moods
 */
const TotalImprovement = ({ totalImprovementAverages }) => {
  const totalImprovementDataset = {
    label: 'mood improvement%',
    data: totalImprovementAverages === undefined || totalImprovementAverages === null ? []
      : [...totalImprovementAverages.map(entry => entry.average * 100)],
    borderColor: '#ff8000',
    fill: false
  }
  const moodChartData = {
    labels: totalImprovementAverages === undefined || totalImprovementAverages === null ? []
      : [...totalImprovementAverages.map(entry => new Date(entry.week[0]))],
    datasets: [totalImprovementDataset]
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
          <h3>Total Improvement</h3>
          <Chart type='line'
            data={moodChartData}
            options={chartOptions} />
        </div>
      </div>
    </div>
  )
}

export default TotalImprovement