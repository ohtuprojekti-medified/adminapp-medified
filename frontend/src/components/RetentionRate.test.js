import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import RetentionRate from './RetentionRate'

describe('<RetentionRate />', () => {
  let component
  let retentionRates, average

  beforeEach(() => {
    retentionRates = [1, 3, 7, 6, 5, 8].map(num => { return { daysUsed: num } })
    average = 5

    component = render(<RetentionRate retentionRates={retentionRates} average={average} />)
  })

  test('renders RetentionRate', () => {
    expect(component.container).toHaveTextContent('Retention rates')
    expect(component.container).toHaveTextContent('Average using period')
    expect(component.container).toHaveTextContent('Average period and single periods:')
  })
})