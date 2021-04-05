import React, { useRef } from 'react'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'

const AppMenu = () => {

  const menu = useRef(null)

  const items = [
    { label: 'Home' }
  ]

  const menuStyle = {
    marginRight: '15px'
  }

  return (
    <div style={menuStyle}>
      <Menu model={items} popup ref={ menu } />
      <Button label="Menu" onClick={(event) => menu.current.toggle(event)} />
    </div>
  )
}

export default AppMenu

