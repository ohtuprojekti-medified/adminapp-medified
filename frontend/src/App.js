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

import classNames from 'classnames'
import userService from './services/userService'
import caregiverService from './services/caregiverService'
import React, { useEffect, useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

// import { PanelMenu } from 'primereact/panelmenu'
import { AppTopbar } from './AppTopbar'
import { AppFooter } from './AppFooter'
import { AppMenu } from './AppMenu'
import { AppConfig } from './AppConfig'
// import { Splitter, SplitterPanel } from 'primereact/splitter'
import Amplify from 'aws-amplify'
import Users from './components/Users'
import Caregivers from './components/Caregivers'
import LoginForm from './components/LoginForm'
import PrimeReact from 'primereact/api'
// import { Divider } from 'primereact/divider'

/**
 * Creates the base for the front page
 *
 */
// const sidepanel = [
//   {
//     label:'Frontpage',
//     icon:'pi pi-fw pi-file',
//   },
//   {
//     label:'App users',
//     icon:'pi pi-fw pi-user',
//     items:[
//       {
//         label:'All users',
//         icon:'pi pi-fw pi-user-plus'
//       },
//       {
//         label:'Search',
//         icon:'pi pi-fw pi-users',
//         items:[
//           {
//             label:'Filter',
//             icon:'pi pi-fw pi-filter',
//             items:[
//               {
//                 label:'Print',
//                 icon:'pi pi-fw pi-print'
//               }
//             ]
//           },
//           {
//             icon:'pi pi-fw pi-bars',
//             label:'List'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     label:'Caregivers',
//     icon:'pi pi-fw pi-user',
//     items:[
//       {
//         label:'Caregivers',
//         icon:'pi pi-fw pi-user',
//         items:[
//           {
//             label:'All caregivers',
//             icon:'pi pi-fw pi-user'
//           },
//           {
//             label:'Joku rajaus',
//             icon:'pi pi-fw pi-user'
//           }
//         ]
//       },
//       {
//         label:'Archieve',
//         icon:'pi pi-fw pi-calendar-times',
//         items:[
//           {
//             label:'Remove',
//             icon:'pi pi-fw pi-calendar-minus'
//           }
//         ]
//       }
//     ]
//   }
// ]


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

  useEffect(() => {
    if (user) {
      userService.setToken(user.signInUserSession.idToken.jwtToken)
      userService.getAll().then(usersAtBeginning => setAppUsers(usersAtBeginning))
      caregiverService.setToken(user.signInUserSession.idToken.jwtToken)
      caregiverService.getAll().then(caregivs => setCaregivers(caregivs))
    }
  }, [user])

  let menuClick = false
  const [layoutMode, setLayoutMode] = useState('static')
  const [layoutColorMode, setLayoutColorMode] = useState('dark')
  const [inputStyle, setInputStyle] = useState('outlined')
  const [staticMenuInactive, setStaticMenuInactive] = useState(false)
  const [overlayMenuActive, setOverlayMenuActive] = useState(false)
  const [mobileMenuActive, setMobileMenuActive] = useState(false)


  const isDesktop = () => {
    return window.innerWidth > 1024
  }

  const onLayoutModeChange = (mode) => {
    setLayoutMode(mode)
  }

  const onColorModeChange = (mode) => {
    setLayoutColorMode(mode)
  }
  const onSidebarClick = () => {
    menuClick = true
  }
  const sidebar = useRef()
  const [ripple, setRipple] = useState(false)
  const menu = [
    { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }
  ]

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false)
      setMobileMenuActive(false)
    }
  }

  const isSidebarVisible = () => {
  // if (isDesktop()) {
  //   if (layoutMode === 'static')
  //     return !staticMenuInactive;
  //   else if (layoutMode === 'overlay')
  //     return overlayMenuActive;
  //   else
  //     return true;
  // }
  // return true;
  }

  const logo = layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg'

  const onRipple = (e) => {
    PrimeReact.ripple = e.value
    setRipple(e.value)
  }

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false)
      setMobileMenuActive(false)
    }
    menuClick = false
  }

  const onToggleMenu = (event) => {
    menuClick = true

    if (isDesktop()) {
      if (layoutMode === 'overlay') {
        setOverlayMenuActive(prevState => !prevState)
      }
      else if (layoutMode === 'static') {
        setStaticMenuInactive(prevState => !prevState)
      }
    }
    else {
      setMobileMenuActive(prevState => !prevState)
    }
    event.preventDefault()
  }


  /**
 * Creates a single page application
 *
 * @type {object}
 * @function
 * @memberof module:src/App
 * @inner
 * @returns {object} - A single page application in JSX
 */


  const sidebarClassName = classNames('layout-sidebar', {
    'layout-sidebar-dark': layoutColorMode === 'dark',
    'layout-sidebar-light': layoutColorMode === 'light'
  })

  const wrapperClass = classNames('layout-wrapper', {
    'layout-overlay': layoutMode === 'overlay',
    'layout-static': layoutMode === 'static',
    'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
    'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
    'layout-mobile-sidebar-active': mobileMenuActive,
    'p-input-filled': inputStyle === 'filled',
    'p-ripple-disabled': ripple === false
  })

  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle)
  }

  return (
    <div className="App">
      {/* <div className={wrapperClass} onClick={onWrapperClick}></div> */}
      {user ? <h3>{user.username} logged in</h3>
        : null
      }
      <AppTopbar onToggleMenu={onToggleMenu} />
      <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
        <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
          <div className="layout-logo">
            <img alt="Logo" src={logo} />
          </div>
          {/* <AppProfile /> */}
          <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
        </div>
      </CSSTransition>
      <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
        layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

      <h1>Adminapp for monitoring moods</h1>
      <LoginForm username={username} setUsername={setUsername} password={password}
        setPassword={setPassword} user={user} setUser={setUser} />

      {/* <div className="p-d-flex">
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
      </div> */}
      <Users users={appUsers} />
      <Caregivers caregivers={caregivers} />
      <AppFooter />
    </div>
  )
}

export default App
