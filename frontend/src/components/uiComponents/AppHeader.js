/**
 * Component for header with nav links
 *
 * @module src/components/uiComponents/AppHeader
 * @requires react
 * @requires react-router-dom
 * @requires src/components/Filter
 */
import React from 'react'
import { Link } from 'react-router-dom'



/**
 * CSS-styling for navigation links
 */
const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  padding: '5px',
  margin: '5px',
  borderColor: '#00b5b8',
  border: '3px solid #00b5b8',
  borderRadius: '5px'
}

/**
 * Component for header's nav links
 *
 * @param {object} param0 - Page name in path and title to show in navigation
 * @param {object} param0.page - page
 * @param {object} param0.title - title
 * @returns { Link } - navigation link
 */
const HeaderLink = ({ page, title }) => {
  return <Link style={linkStyle} to={`/${page}`}>{title}</Link>
}

/**
 * Component containing all navigation links
 *
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