import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('<LoginForm />', () => {
  let component, formWithMock
  let username, password
  let mockSetUser, mockSetUsername, mockSetPassword

  // Test users username and password
  const testUsername = 'FormUser'
  const testPassword = 'PasswordInForm'

  beforeEach(() => {
    component = render(<LoginForm />)

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

  test('clicking login-button calls setUser', async () => {
    const usernameInput = formWithMock.container.querySelector('input[type=\'text\']')
    const passwordInput = formWithMock.container.querySelector('input[type=\'password\']')
    const loginButton = formWithMock.container.querySelector('button')

    // Add username and password to input fields
    fireEvent.change(usernameInput, {
      target: { value: testUsername }
    })
    fireEvent.change(passwordInput, {
      target: { value: testPassword }
    })

    // Click login
    fireEvent.click(loginButton)
    await waitFor(() => expect(mockSetUser.mock.calls).toHaveLength(1))
  })
})