import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  let component

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
})