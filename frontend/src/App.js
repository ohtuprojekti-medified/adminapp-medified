/**
 * Frontend app
 *
 * @module src/App
 * @requires primereact/resources/themes/vela-purple/theme.css
 * @requires primereact/resources/primereact.min.css
 * @requires primeicons/primeicons.css
 * @requires src/App.css
 * @requires src/services/userService
 * @requires src/services/caregiverService
 * @requires react
 * @requires aws-amplify
 * @requires src/components/Users
 * @requires src/components/Caregivers
 * @requires src/components/LoginForm
 * @requires dotenv
 */

// Muut mahdolliset teemat: saga ja arya, ja värit: purple, orange, green, blue
import 'primereact/resources/themes/vela-orange/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'react-transition-group'

import './App.css'

import userService from './services/userService'
import caregiverService from './services/caregiverService'
import React, { useEffect, useState } from 'react'
import { PanelMenu } from 'primereact/panelmenu'
// import { Splitter, SplitterPanel } from 'primereact/splitter'
import Amplify from 'aws-amplify'
import Users from './components/Users'
import Caregivers from './components/Caregivers'
import LoginForm from './components/LoginForm'
import { Divider } from 'primereact/divider'

/**
 * Creates the base for the front page
 *
 */
const sidepanel = [
  {
    label:'Frontpage',
    icon:'pi pi-fw pi-file',
  },
  {
    label:'App users',
    icon:'pi pi-fw pi-user',
    items:[
      {
        label:'All users',
        icon:'pi pi-fw pi-user-plus'
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
    label:'Caregivers',
    icon:'pi pi-fw pi-user',
    items:[
      {
        label:'Caregivers',
        icon:'pi pi-fw pi-user',
        items:[
          {
            label:'All caregivers',
            icon:'pi pi-fw pi-user'
          },
          {
            label:'Joku rajaus',
            icon:'pi pi-fw pi-user'
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


/**
 * Creates a single page application
 *
 * @type {object}
 * @function
 * @memberof module:src/App
 * @inner
 * @returns {object} - A single page application in JSX
 */
const App = () => {
  const [appUsers, setAppUsers] = useState([])
  const [caregivers, setCaregivers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(undefined)

  /**
   * Configure amplify authorization and check if user is logged in
   *
   * @type {object}
   * @function
   * @memberof module:src/App
   * @inner
   */
  useEffect(() => {
    require('dotenv').config()
    Amplify.configure({
      Auth: {
        userPoolId: 'eu-west-1_sAj8nsLY6',
        userPoolWebClientId: '57bgrf7014uhtdu95jm8ci2ok5',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
      }
    })
    console.log(Amplify.configure())

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
  }, [])

  /**
   * Set token for user service and GET data if user logs in or is logged in
   *
   * @type {object}
   * @function
   * @memberof module:src/App
   * @inner
   */
  useEffect(() => {
    if (user) {
      userService.setToken(user.signInUserSession.idToken.jwtToken)
      userService.getAll().then(usersAtBeginning => setAppUsers(usersAtBeginning))
      caregiverService.setToken(user.signInUserSession.idToken.jwtToken)
      caregiverService.getAll().then(caregivs => setCaregivers(caregivs))
    }
  }, [user])

  return (
    <div className="App">
      {user ? <h3>{user.username} logged in</h3>
        : null
      }
      <h1>Adminapp for monitoring moods</h1>
      <LoginForm username={username} setUsername={setUsername} password={password}
        setPassword={setPassword} user={user} setUser={setUser} />

      <div className="p-d-flex">
        <div>
          <PanelMenu model= { sidepanel } style={ { width:'300px' } }/>
        </div>
        <Divider layout="vertical" />
        {user
          ?
          <div>
            <Users users={appUsers} />
            <Caregivers caregivers={caregivers} />
          </div>
          :
          null
        }
      </div>
    </div>
  )
}

export default App
