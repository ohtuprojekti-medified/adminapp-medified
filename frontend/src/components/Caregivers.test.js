/**.
 * Tests for Caregivers component
 *
 * @module frontend/src/components/Caregivers_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/Caregivers
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Caregivers from './Caregivers'

/**.
 * Describe tests
 *
 * @type {object}
 *
 * @memberof module:frontend/src/components/Caregivers_test
 * @param {string} description - Description of tests
 * @param {Function} testCode - Code for tests
 */
describe('Caregivers', () => {

  /**.
   * Test that Caregivers renders correct amount of caregivers
   *
   * @type {object}
   *
   * @memberof module:frontend/src/components/Caregivers_test
   * @inner
   * @param {string} description - renders content
   * @param {Function} testFunction - Runs the test
   */
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
})