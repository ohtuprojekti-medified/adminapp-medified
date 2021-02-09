import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('<LoginForm />', () => {
  let component, formWithMock
  let usernameInput, passwordInput, loginForm
  let username, password
  let mockSetUser, mockSetUsername, mockSetPassword

  // Test users username and password
  const testUsername = 'FormUser'
  const testPassword = 'PasswordInForm'

  beforeEach(() => {
    component = render(<LoginForm />)

    usernameInput = component.container.querySelector('input[type=\'text\']')
    passwordInput = component.container.querySelector('input[type=\'password\']')
    loginForm = component.container.querySelector('form')

    // Mock-functions for Form
    mockSetUser = jest.fn()
    mockSetUsername = jest.fn()
    mockSetPassword = jest.fn()

    // Form with mock-functions
    formWithMock = render(
      <LoginForm username={username} setUsername={mockSetUsername} password={password}
        setPassword={mockSetPassword} setUser={mockSetUser} />
    )
  })

  test('renders form', () => {
    expect(component.container).toHaveTextContent('Login:')
    expect(component.container).toHaveTextContent('username:')
    expect(component.container).toHaveTextContent('password:')
    expect(component.container).toHaveTextContent('login')
  })

  test('submitting form calls setUser', async () => {
    const mockUsernameInput = formWithMock.container.querySelector('input[type=\'text\']')
    const mockPasswordInput = formWithMock.container.querySelector('input[type=\'password\']')
    const mockLoginForm = formWithMock.container.querySelector('form')
    // Add username and password to input fields
    fireEvent.change(mockUsernameInput, {
      target: { value: testUsername }
    })
    fireEvent.change(mockPasswordInput, {
      target: { value: testPassword }
    })

    fireEvent.submit(mockLoginForm)
    await waitFor(() => expect(mockSetUser.mock.calls).toHaveLength(1))
  })

  test('logging in renders logout-button', async () => {
    // Add username and password to form
    fireEvent.change(usernameInput, {
      target: { value: username }
    })
    fireEvent.change(passwordInput, {
      target: { value: password }
    })
    // Submit the form
    fireEvent.submit(loginForm)

    waitFor(() => expect(component.container.toHaveTextContent('logOut')))
  })

  test('logging out renders login-form', async () => {
    // Add username and password to form
    fireEvent.change(usernameInput, {
      target: { value: username }
    })
    fireEvent.change(passwordInput, {
      target: { value: password }
    })
    // Submit the form
    fireEvent.submit(loginForm)

    const logOutButton = component.container.querySelector('button[id=\'logOut\']')
    waitFor(() => fireEvent.click(logOutButton))

    waitFor(() => {
      expect(component.container).toHaveTextContent('Login:')
      expect(component.container).toHaveTextContent('username:')
      expect(component.container).toHaveTextContent('password:')
      expect(component.container).toHaveTextContent('login')
    })
  })
})