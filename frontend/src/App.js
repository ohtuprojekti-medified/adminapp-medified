// Muut mahdolliset teemat: vela, saga ja arya, ja värit: orange, green, blue, purple
import 'primereact/resources/themes/saga-orange/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'react-transition-group'
import { PanelMenu } from 'primereact/panelmenu'
import { Splitter, SplitterPanel } from 'primereact/splitter'

import './App.css'

import userService from './services/userService'
import React, { useEffect, useState } from 'react'
import Users from './components/Users'


const items = [
  {
    label:'Frontpage',
    icon:'pi pi-fw pi-file',
    items:[
      {
        label:'New',
        icon:'pi pi-fw pi-plus',
        items:[
          {
            label:'Bookmark',
            icon:'pi pi-fw pi-bookmark'
          },
          {
            label:'Video',
            icon:'pi pi-fw pi-video'
          }
        ]
      },
      {
        label:'Delete',
        icon:'pi pi-fw pi-trash'
      },
      {
        label:'Export',
        icon:'pi pi-fw pi-external-link'
      }
    ]
  },
  {
    label:'Favorites',
    icon:'pi pi-fw pi-pencil',
    items:[
      {
        label:'Left',
        icon:'pi pi-fw pi-align-left'
      },
      {
        label:'Right',
        icon:'pi pi-fw pi-align-right'
      },
      {
        label:'Center',
        icon:'pi pi-fw pi-align-center'
      },
      {
        label:'Justify',
        icon:'pi pi-fw pi-align-justify'
      },

    ]
  },
  {
    label:'Users',
    icon:'pi pi-fw pi-user',
    items:[
      {
        label:'New',
        icon:'pi pi-fw pi-user-plus'
      },
      {
        label:'Delete',
        icon:'pi pi-fw pi-user-minus'
      },
      {
        label:'Search',
        icon:'pi pi-fw pi-users',
        items:[
          {
            label:'Filter',
            icon:'pi pi-fw pi-filter',
            items:[
              {
                label:'Print',
                icon:'pi pi-fw pi-print'
              }
            ]
          },
          {
            icon:'pi pi-fw pi-bars',
            label:'List'
          }
        ]
      }
    ]
  },
  {
    label:'Events',
    icon:'pi pi-fw pi-calendar',
    items:[
      {
        label:'Edit',
        icon:'pi pi-fw pi-pencil',
        items:[
          {
            label:'Save',
            icon:'pi pi-fw pi-calendar-plus'
          },
          {
            label:'Delete',
            icon:'pi pi-fw pi-calendar-minus'
          }
        ]
      },
      {
        label:'Archieve',
        icon:'pi pi-fw pi-calendar-times',
        items:[
          {
            label:'Remove',
            icon:'pi pi-fw pi-calendar-minus'
          }
        ]
      }
    ]
  }
]


const App = () => {
  const [users, setUsers] = useState([])

  // Get users when browser connects
  useEffect(() => userService.getAll().then(usersAtBeginning => setUsers(usersAtBeginning)), [])

  return (
    <div className="App">
      <h1>Adminapp for monitoring moods</h1>
      <Splitter>
        <SplitterPanel size={20}>
          <PanelMenu model= { items } style={ { width:'300px' } }/>
        </SplitterPanel>
        <SplitterPanel size={80}>
          <Users users={users} />
        </SplitterPanel>
      </Splitter>
    </div>
  )
}

export default App
