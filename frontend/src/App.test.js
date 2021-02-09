import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import App from './App'

describe('<App />', () => {
  let component

  const testUsername = 'TestUser'
  const testPassword = 'TestPassword'

  beforeEach(() => {
    component = render(<App />)
  })

  test('renders header', () => {
    expect(component.container).toHaveTextContent(
      'Adminapp for monitoring moods'
    )
  })

  test('renders login form', () => {
    expect(component.container).toHaveTextContent('Login:')
    expect(component.container).toHaveTextContent('username:')
    expect(component.container).toHaveTextContent('password:')
  })

  //This test has a bug where the login form is not submitted
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
    // Click Login button
    // This does not work
    fireEvent.submit(loginForm)

    waitFor(() => {
      expect(component.container).not.toHaveTextContent('Login:')
      expect(component.container).not.toHaveTextContent('username:')
      expect(component.container).not.toHaveTextContent('password:')
    })
  })
})