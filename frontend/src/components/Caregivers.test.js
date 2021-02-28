import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Caregivers from './Caregivers'

test('renders content', () => {
  const caregivers = [{
    id: 16,
    user_id: '123abc',
    access_code_id: '456efg',
    created_at: null,
    updated_at: null,
    consent: true
  }]

  const component = render(
    <Caregivers caregivers={caregivers} />
  )

  expect(component.container).toHaveTextContent(
    'Registered caregivers: 1'
  )
})