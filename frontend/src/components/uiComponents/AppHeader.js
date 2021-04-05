import React from 'react'
import { Link } from 'react-router-dom'

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  padding: '5px',
  margin: '5px',
  borderColor: '#00b5b8',
  border: '3px solid #00b5b8',
  borderRadius: '5px'
}


const HeaderLink = ({ page, title }) => {
  return <Link style={linkStyle} to={`/${page}`}>{title}</Link>
}

const Header = () => {
  return (
    <div className='header'>
      <HeaderLink page='home' title='Home' />
      <HeaderLink page='retention' title='Retention rates' />
      <HeaderLink page='cumulative' title='New and active users' />
    </div>
  )
}

export default Header