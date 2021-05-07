/**.
 * Tests for Users component
 *
 * @module frontend/src/components/Users_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/Users
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Users from './Users'
/**.
 * Describe tests
 *
 * @memberof module:frontend/src/components/Users_test
 * @param {string} description - Description of tests
 * @param {Function} testCode - Code for tests
 */
describe('Users', () => {

  /**.
   * Test that Users is rendered
   *
   * @memberof module:frontend/src/components/Users_test
   * @inner
   * @param {string} description - renders content
   * @param {Function} testCode - Code that runs the test
   */
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
})