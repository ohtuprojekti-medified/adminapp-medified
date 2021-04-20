/**
 * Tests for AverageMoodWeekly component
 *
 * @module src/components/AverageMoodWeekly_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires src/components/AverageMoodWeekly
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import AverageMoodWeekly from './AverageMoodWeekly'

/**
 * Describe tests
 *
 * @type {object}
 * @function
 * @memberof module:src/components/AverageMoodWeekly_test
 * @param {string} description - Description of tests
 * @param {object} testCode - Code for tests
 */
describe('<AverageMoodWeekly />', () => {
  let component

  /**
   * Render AverageMoodWeekly
   *
   * @type {object}
   * @function
   * @memberof module:src/components/AverageMoodWeekly_test
   * @inner
   * @param {object} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    component = render(<AverageMoodWeekly />)
  })

  /**
   * Test that MoodAverage is rendered
   *
   * @type {object}
   * @function
   * @memberof module:src/components/AverageMoodWeekly_test
   * @inner
   * @param {string} description - renders AverageMoodWeekly
   * @param {object} TestCode - Code that runs the test
   */
  test('renders AverageMoodWeekly', () => {
    waitFor(() => {
      expect(component.container.toHaveTextContent('Adminapp for monitoring moods'))
      expect(component.container.toHaveTextContent('Average mood weekly'))
    })
  })
})