import React from 'react'

const LoginForm = ({ username, setUsername, password, setPassword }) => {

  const handleLogin = (event) => {
    event.preventDefault()

    console.log('Login for ', username)
  }
  return (
    <div>
      <h3>Login:</h3>
      <form onSubmit={handleLogin}>
        <div>username: <input type='text' value={username} name='Username'
          onChange={({ target }) => setUsername(target.value)} /></div>
        <div>password: <input type='password' value={password} name='Password'
          onChange={({ target }) => setPassword(target.value)} /></div>
      </form>
      <button type='submit'>Login</button>
    </div>
  )
}

export default LoginForm