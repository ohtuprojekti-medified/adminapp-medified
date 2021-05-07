/**.
 * Component for header with nav links
 *
 * @module frontend/src/components/uiComponents/AppHeader
 * @requires react
 * @requires react-router-dom
 * @requires frontend/src/components/Filter
 * @exports Header - Page header
 */
import React from 'react'
import { Link } from 'react-router-dom'



/**
 * CSS-styling for navigation links.
 *
 * @constant
 * @type {object}
 */
const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  padding: '5px',
  margin: '5px',
  borderColor: '#30C8BF',
  border: '3px solid #30C8BF',
  borderRadius: '5px'
}

/**.
 * Component for header's nav links
 *
 * @constant
 * @function
 * @param {*} param0 - Page name in path and title to show in navigation
 * @param {string} param0.page - page
 * @param {string} param0.title - title
 * @memberof module:frontend/src/components/uiComponents/AppHeader
 * @returns { Link } - navigation link
 */
const HeaderLink = ({ page, title }) => {
  return <Link style={linkStyle} to={`/${page}`}>{title}</Link>
}

/**.
 * Component containing all navigation links
 *
 * @constant
 * @function
 * @memberof module:frontend/src/components/uiComponents/AppHeader
 * @returns {object} - JSX component containing all links
 */
const Header = () => {
  return (
    <div className='header'>
      <HeaderLink page='' title='Home' />
      <HeaderLink page='retention' title='Retention rates' />
      <HeaderLink page='cumulative' title='New and active users' />
      <HeaderLink page='moodimprovement' title='Mood improvement' />
    </div>
  )
}

export default Header