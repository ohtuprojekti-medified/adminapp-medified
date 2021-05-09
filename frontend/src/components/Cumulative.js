/**.
 * Component for graphing all new users, cumulative
 *
 * @module frontend/src/components/Cumulative
 * @requires react
 * @requires primereact/chart
 * @exports Cumulative
 */
import React from 'react'
import { Chart } from 'primereact/chart'
import { subDays, format } from 'date-fns'

/**.
 * Component for graphing all new users, cumulative
 *
 * @constant
 * @function
 * @memberof module:frontend/src/components/Cumulative
 * @param {*} param0 - Object with weekly cumulative users
 * @param {Array} param0.cumulative - Array of all cumulative users
 * @param {Array} param0.activeUsers - Array of all active users
 * @returns {object} - JSX component that lists amount of new users in a cumulative manner
 */
const Cumulative = ({ cumulative, activeUsers }) => {

  const emptyWeek = () => {
    const dateFormat = 'yyyy-MM-dd'
    const lastDay = new Date()
    return { week: [format(subDays(lastDay, 7), dateFormat), format(lastDay, dateFormat)], entries: 0 }
  }

  cumulative = cumulative.length === 0
    ? [emptyWeek()]
    : cumulative
  activeUsers = activeUsers.length === 0
    ? [emptyWeek()]
    : activeUsers


  const firstActive = activeUsers[0].week

  for (let i = 0; i < cumulative.length; i++) {
    if (cumulative[i].week[0] > firstActive) {
      break
    }
    const object = {
      week: cumulative[i].week,
      entries: 0
    }
    activeUsers = [object, ...activeUsers]
  }

  const chartData = {
    labels: [...cumulative.map(entry => new Date(entry.week[0]))],
    datasets: [
      {
        label: 'cumulative new users',
        data: [...cumulative.map(entry => entry.entries)]
      },
      {
        label: 'active users weekly',
        backgroundColor: '#30C8BF',
        data: [...activeUsers.map(entry => entry.entries)]
      }
    ]
  }

  const chartOptions = {
    scales: {
      xAxes: [{
        type: 'time',
      }]
    },
    animation: false
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
          <h3>New users, cumulative and active users weekly</h3>
          <Chart type='line' data={chartData} options={chartOptions} />
        </div>
      </div>

    </div>

  )
}

export default Cumulative



