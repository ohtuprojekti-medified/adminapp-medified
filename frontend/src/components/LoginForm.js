import React from 'react'
import loginService from '../services/loginService'

const LoginForm = ({ username, setUsername, password, setPassword, user, setUser }) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const token = await loginService.login({ username, password })
      setUser(token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('An error occured')
    }
  }

  const logOut = async (event) => {
    event.preventDefault()

    try {
      await loginService.logOut()
      setUser(null)
    } catch (exception) {
      console.log('An error occured')
    }
  }
  return (
    user
      ? <button onClick={logOut}>log out</button>
      : <div>
        <h3>Login:</h3>
        <form onSubmit={handleLogin}>
          <div>username: <input id='username' type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)} /></div>
          <div>password: <input id='password' type='password' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)} /></div>
          <button type='submit'>login</button>
        </form>
      </div>
  )
}

export default LoginForm