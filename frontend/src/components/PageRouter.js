import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginForm from './LoginForm'
import AppFooter from './uiComponents/AppFooter'
import AppTopbar from './uiComponents/AppTopbar'
import AppContent from './uiComponents/AppContent'

const PageRouter = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f2f2f2',
    paddingBottom: '100px'
  }

  return (
    <Router basename={process.env.REACT_APP_ROUTER_BASENAME}>
      {props.user ?
        <div style={containerStyle}>
          <div className='p-component'>
            <AppTopbar user={props.user}
              setUser={props.setUser}
              caregiverFilterForAllUsers={props.caregiverFilterForAllUsers}
              handleFilterChange={props.handleFilterChange} />

            <AppContent user={props.user}
              appUsers={props.appUsers}
              caregivers={props.caregivers}
              caregiverFilterForAllUsers={props.caregiverFilterForAllUsers}
              handleFilterChange={props.handleFilterChange}
              cumulativeUsers={props.cumulativeUsers}
              activeUsers={props.activeUsers}
              retentionRates={props.retentionRates}
              averageRetention={props.averageRetention}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              setUser={props.setUser} />

          </div>
          <AppFooter />
        </div>
        :
        <>
          <AppTopbar user={props.user}
            setUser={props.setUser}
            caregiverFilterForAllUsers={props.caregiverFilterForAllUsers}
            handleFilterChange={props.handleFilterChange} />
          <Switch>
            <Route path="/" >
              <LoginForm username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                user={props.user}
                setUser={props.setUser} />
            </Route>
          </Switch>
        </>
      }
    </Router>
  )
}

export default PageRouter