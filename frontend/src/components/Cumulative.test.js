/**.
 * Tests for Cumulative component
 *
 * @module src/components/Cumulative_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires src/components/Cumulative
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import Cumulative from './Cumulative'

/**.
 * Describe tests
 *
 * @type {object}
 * @function
 * @memberof module:src/components/Cumulative_test
 * @param {string} description - Description of tests
 * @param {object} testCode - Code for tests
 */
describe('<Cumulative />', () => {
  let component

  /**.
   * Render Cumulative with mock values
   *
   * @type {object}
   * @function
   * @memberof module:src/components/Cumulative_test
   * @inner
   * @param {object} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    component = render(<Cumulative cumulative={[]} activeUsers={[]} />)
  })

  /**.
   * Test that Cumulative is rendered
   *
   * @type {object}
   * @function
   * @memberof module:src/components/Cumulative_test
   * @inner
   * @param {string} description - Renders chart
   * @param {object} TestCode - Code that runs the test
   */
  test('renders Cumulative', () => {
    waitFor(() => {
      expect(component.container).toHaveTextContent('New users, cumulative and active users weekly')
      expect(component.container).toHaveTextContent('cumulative new users')
      expect(component.container).toHaveTextContent('active users weekly')
    })
  })
})