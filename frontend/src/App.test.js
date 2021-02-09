import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import App from './App'

describe('<App />', () => {
  let component

  // Test users username and password
  const testUsername = 'TestUser'
  const testPassword = 'TestPassword'

  beforeEach(() => {
    component = render(<App />)
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
    const usernameInput = component.container.querySelector('input[type=\'text\']')
    const passwordInput = component.container.querySelector('input[type=\'password\']')
    const loginForm = component.container.querySelector('form')

    // Add username and password to form
    fireEvent.change(usernameInput, {
      target: { value: testUsername }
    })
    fireEvent.change(passwordInput, {
      target: { value: testPassword }
    })
    // Submit the form
    fireEvent.submit(loginForm)

    waitFor(() => {
      expect(component.container).not.toHaveTextContent('Login:')
      expect(component.container).not.toHaveTextContent('username:')
      expect(component.container).not.toHaveTextContent('password:')
    })
  })

  test('renders patients page after successful login', async () => {
    // Login
    const usernameInput = component.container.querySelector('input[type=\'text\']')
    const passwordInput = component.container.querySelector('input[type=\'password\']')
    const loginForm = component.container.querySelector('form')
    fireEvent.change(usernameInput, {
      target: { value: testUsername }
    })
    fireEvent.change(passwordInput, {
      target: { value: testPassword }
    })
    fireEvent.submit(loginForm)

    waitFor(() => expect(component.container).toHaveTextContent('Patients moods listed'))
  })
})