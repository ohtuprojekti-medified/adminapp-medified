/**.
 * Tests for Cumulative component
 *
 * @module frontend/src/components/Cumulative_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/Cumulative
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import Cumulative from './Cumulative'

/**.
 * Describe tests
 *
 * @memberof module:frontend/src/components/Cumulative_test
 * @param {string} description - Description of tests
 * @param {Function} testCode - Code for tests
 */
describe('<Cumulative />', () => {
  let component

  /**.
   * Render Cumulative with mock values
   *
   * @memberof module:frontend/src/components/Cumulative_test
   * @inner
   * @param {Function} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    component = render(<Cumulative cumulative={[]} activeUsers={[]} />)
  })

  /**.
   * Test that Cumulative is rendered
   *
   * @memberof module:frontend/src/components/Cumulative_test
   * @inner
   * @param {string} description - Renders chart
   * @param {Function} testCode - Code that runs the test
   */
  test('renders Cumulative', () => {
    waitFor(() => {
      expect(component.container).toHaveTextContent('New users, cumulative and active users weekly')
      expect(component.container).toHaveTextContent('cumulative new users')
      expect(component.container).toHaveTextContent('active users weekly')
    })
  })
})