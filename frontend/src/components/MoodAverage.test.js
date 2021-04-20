import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import MoodAverage from './MoodAverage'

describe('<MoodAverage />', () => {
  let component

  beforeEach(() => {
    component = render(<MoodAverage />)
  })

  test('renders MoodAverage', () => {
    waitFor(() => {
      expect(component.container.toHaveTextContent('Adminapp for monitoring moods'))
      expect(component.container.toHaveTextContent('Average mood weekly'))
    })
  })
})