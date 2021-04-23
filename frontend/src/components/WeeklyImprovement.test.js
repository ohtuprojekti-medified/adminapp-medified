/**.
 * Tests for WeeklyImprovement component
 *
 * @module src/components/WeeklyImprovement_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires src/components/WeeklyImprovement
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import WeeklyImprovement from './WeeklyImprovement'

/**.
 * Describe tests
 *
 * @type {object}
 * @function
 * @memberof module:src/components/WeeklyImprovement_test
 * @param {string} description - Description of tests
 * @param {object} testCode - Code for tests
 */
describe('<WeeklyImprovement />', () => {
  let component

  /**.
   * Render WeeklyImprovement
   *
   * @type {object}
   * @function
   * @memberof module:src/components/WeeklyImprovement_test
   * @inner
   * @param {object} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    component = render(<WeeklyImprovement />)
  })

  /**.
   * Test that WeeklyImprovement is rendered
   *
   * @type {object}
   * @function
   * @memberof module:src/components/WeeklyImprovement_test
   * @inner
   * @param {string} description - renders WeeklyImprovement
   * @param {object} TestCode - Code that runs the test
   */
  test('renders WeeklyImprovement', () => {
    waitFor(() => {
      expect(component.container.toHaveTextContent('Adminapp for monitoring moods'))
      expect(component.container.toHaveTextContent('Weekly Improvement'))
    })
  })
})