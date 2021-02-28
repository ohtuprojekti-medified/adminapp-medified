import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Users from './Users'

test('renders content correctly', () => {
  const users = [
    {
      user_id: 'ffd543',
      height: null,
      weight: null,
      sex: 1,
      birthdate: null,
      created_at: null,
      updated_at: null,
      first_name: 'Testi',
      last_name: 'Testaaja',
      added_organisation: 'OHTU'
    }
  ]

  const component = render(
    <Users users={users} />
  )

  expect(component.container).toHaveTextContent(
    'Application users: 1'
  )
})