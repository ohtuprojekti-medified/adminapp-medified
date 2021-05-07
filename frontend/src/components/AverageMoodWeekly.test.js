/**.
 * Tests for AverageMoodWeekly component
 *
 * @module frontend/src/components/AverageMoodWeekly_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/AverageMoodWeekly
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import AverageMoodWeekly from './AverageMoodWeekly'

/**.
 * Describe tests
 *
 * @memberof module:frontend/src/components/AverageMoodWeekly_test
 * @param {string} description - Description of tests
 * @param {Function} testCode - Code for tests
 */
describe('<AverageMoodWeekly />', () => {
  let component

  /**.
   * Render AverageMoodWeekly
   *
   * @memberof module:frontend/src/components/AverageMoodWeekly_test
   * @inner
   * @param {Function} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    component = render(<AverageMoodWeekly />)
  })

  /**.
   * Test that MoodAverage is rendered
   *
   * @memberof module:frontend/src/components/AverageMoodWeekly_test
   * @inner
   * @param {string} description - renders AverageMoodWeekly
   * @param {Function} testCode - Code that runs the test
   */
  test('renders AverageMoodWeekly', () => {
    waitFor(() => {
      expect(component.container.toHaveTextContent('Adminapp for monitoring moods'))
      expect(component.container.toHaveTextContent('Average mood weekly'))
    })
  })
})