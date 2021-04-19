import React from 'react'
import { Chart } from 'primereact/chart'

const MoodAverage = ({ moodAverages }) => {
  let lastAverage = 0
  const chartData = {
    labels: [...moodAverages.map(entry => new Date(entry.week[0]))],
    datasets: [
      {
        label: 'mood improvement',
        data: [...moodAverages.map(entry => {
          if (entry.average === null) {
            return lastAverage
          } else {
            lastAverage = entry.average[entry.average.length - 1]
            return entry.average[entry.average.length - 1]
          }
        })]
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
          <h3>Mood average timeline</h3>
          <Chart type='line' data={chartData} options={chartOptions} />
        </div>
      </div>

    </div>

  )
}

export default MoodAverage