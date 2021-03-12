/**
 * Component for all new users, cumulative, week by week
 *
 * @module src/components/Cumulative
 * @requires react
 */
import React from 'react'

/**
 * Component listing all new users, cumulative, week by week
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
  console.log(cumulative)

  if (cumulative.length === 0) {
    console.log('foo')
    return null
  }

  return (
    <div>
      <h3>New users, cumulative, week by week</h3>
      <p>Number of weeks in history: {cumulative.length} </p>
      {cumulative.map(entry => <p key={entry.week[0]}>
        week: {entry.week[0]} new users (cumulative): {entry.entries}
      </p>)}
    </div>
  )
}

export default Cumulative

