import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import App from './App'

test('renders header', () => {
  const component = render(<App />)

  expect(component.container).toHaveTextContent(
    'Adminsovellus mielialan seurantaan'
  )
})