/**
 * Tests for MoodAverage component
 *
 * @module src/components/MoodAverage_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires src/components/MoodAverage
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import MoodAverage from './MoodAverage'

/**
 * Describe tests
 *
 * @type {object}
 * @function
 * @memberof module:src/components/MoodAverage_test_test
 * @param {string} description - Description of tests
 * @param {object} testCode - Code for tests
 */
describe('<MoodAverage />', () => {
  let component

  /**
   * Render MoodAverage
   *
   * @type {object}
   * @function
   * @memberof module:src/components/MoodAverage_test
   * @inner
   * @param {object} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    component = render(<MoodAverage />)
  })

  /**
   * Test that MoodAverage is rendered
   *
   * @type {object}
   * @function
   * @memberof module:src/components/MoodAverage_test
   * @inner
   * @param {string} description - renders MoodAverage
   * @param {object} TestCode - Code that runs the test
   */
  test('renders MoodAverage', () => {
    waitFor(() => {
      expect(component.container.toHaveTextContent('Adminapp for monitoring moods'))
      expect(component.container.toHaveTextContent('Average mood weekly'))
    })
  })
})