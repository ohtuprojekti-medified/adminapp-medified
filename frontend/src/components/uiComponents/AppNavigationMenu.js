import React, { useRef } from 'react'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { useHistory } from 'react-router-dom'


const AppNavigationMenu = () => {
  const menu = useRef(null)
  let history = useHistory()
  const items = [
    {
      label: 'Navigate',
      items: [
        {
          label: 'All graphs',
          icon: 'pi pi-fw pi-home',
          command:() => { history.push('/') }
        },
        {
          label: 'Retention rates',
          icon: 'pi pi-fw pi-chart-bar',
          command:() => { history.push('/retention') }
        },
        {
          label: 'New and active users',
          icon: 'pi pi-fw pi-chart-bar',
          command:() => { history.push('/cumulative') }
        },
        {
          label: 'Mood improvement',
          icon: 'pi pi-fw pi-chart-bar',
          command:() => { history.push('/moodimprovement') }
        }
      ]
    }
  ]

  return (
    <div>
      <Menu model={items} popup ref={menu} id="popup_menu" />
      <Button label="Navigation" icon="pi pi-map" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />
    </div>
  )
}

export default AppNavigationMenu