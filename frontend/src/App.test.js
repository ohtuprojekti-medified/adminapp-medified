import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import App from './App'

describe('<App />', () => {
  let component
  let usernameInput, passwordInput, loginForm

  const login = (username, password) => {
    // Add username and password to form
    fireEvent.change(usernameInput, {
      target: { value: username }
    })
    fireEvent.change(passwordInput, {
      target: { value: password }
    })
    // Submit the form
    fireEvent.submit(loginForm)
  }

  // Test users username and password
  const testUsername = 'TestUser'
  const testPassword = 'TestPassword'

  beforeEach(() => {
    component = render(<App />)

    usernameInput = component.container.querySelector('input[type=\'text\']')
    passwordInput = component.container.querySelector('input[type=\'password\']')
    loginForm = component.container.querySelector('form')
  })

  test('renders header', () => {
    expect(component.container).toHaveTextContent('Adminapp for monitoring moods')
  })

  test('renders login form', () => {
    expect(component.container).toHaveTextContent('Login:')
    expect(component.container).toHaveTextContent('username:')
    expect(component.container).toHaveTextContent('password:')
  })

  test('does not render login form after logged in', async () => {
    login(testUsername, testPassword)

    waitFor(() => {
      expect(component.container).not.toHaveTextContent('Login:')
      expect(component.container).not.toHaveTextContent('username:')
      expect(component.container).not.toHaveTextContent('password:')
    })
  })

  test('renders patients page after successful login', async () => {
    login(testUsername, testPassword)

    waitFor(() => expect(component.container).toHaveTextContent('Patients moods listed'))
  })

  test('renders login form after log out', async () => {
    login(testUsername, testPassword)

    // Log out
    const logOutButton = component.container.querySelector('button[id=\'logOut\']')
    waitFor(() => fireEvent.click(logOutButton))

    waitFor(() => {
      expect(component.container).toHaveTextContent('Login:')
      expect(component.container).toHaveTextContent('username:')
      expect(component.container).toHaveTextContent('password:')
    })
  })
})