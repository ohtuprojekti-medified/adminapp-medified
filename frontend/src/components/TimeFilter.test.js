/**.
 * Tests for TimeFilter component
 *
 * @module frontend/src/components/TimeFilter_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/TimeFilter
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor, fireEvent } from '@testing-library/react'
import TimeFilter from './TimeFilter'

/**.
 * Describe tests
 *
 * @type {object}
 *
 * @memberof module:frontend/src/components/TimeFilter_test
 * @param {string} description - Description of tests
 * @param {Function} testCode - Code for tests
 */
describe('<TimeFilter />', () => {
  let component
  let handleStartDateEnableChange
  let handleEndDateEnableChange
  let handleStartDateChange
  let handleEndDateChange

  /**.
   * Render TimeFilter with mock values
   *
   * @type {object}
   *
   * @memberof module:frontend/src/components/TimeFilter_test
   * @inner
   * @param {object} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    handleStartDateEnableChange = jest.fn()
    handleEndDateEnableChange = jest.fn()
    handleStartDateChange = jest.fn()
    handleEndDateChange = jest.fn()
    component = render(<TimeFilter startDateEnable={false} endDateEnable={false}
      startDate={''} endDate={''} handleStartDateEnableChange={handleStartDateEnableChange}
      handleEndDateEnableChange={handleEndDateEnableChange} handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange} />)
  })


  /**.
   * Test that TimeFilter is rendered
   *
   * @type {object}
   *
   * @memberof module:frontend/src/components/TimeFilter_test
   * @inner
   * @param {string} description - Renders filter
   * @param {Function} testCode - Code that runs the test
   */
  test('renders TimeFilter', () => {
    waitFor(() => {
      expect(component.container).toHaveTextContent('Start date')
      expect(component.container).toHaveTextContent('End date')
    })
  })

  /**.
   * Test that TimeFilter calls start date enable eventhandler
   *
   * @type {object}
   *
   * @memberof module:frontend/src/components/TimeFilter_test
   * @inner
   * @param {string} description - Calls start date enable eventhandler
   * @param {Function} testCode - Code that runs the test
   */
  test('checking start date checkbox calls eventhandler', () => {
    const checkbox = component.findByTestId('startDate-checkbox')

    waitFor(() => {
      fireEvent.click(checkbox)
      expect(handleStartDateEnableChange.mock.calls).toHaveLength(1)
    })
  })

  /**.
   * Test that TimeFilter calls end date enable eventhandler
   *
   * @type {object}
   *
   * @memberof module:frontend/src/components/TimeFilter_test
   * @inner
   * @param {string} description - Calls end date enable eventhandler
   * @param {Function} testCode - Code that runs the test
   */
  test('checking end date checkbox calls eventhandler', () => {
    const checkbox = component.findByTestId('endDate-checkbox')

    waitFor(() => {
      fireEvent.click(checkbox)
      expect(handleEndDateEnableChange.mock.calls).toHaveLength(1)
    })
  })

  /**.
   * Test that TimeFilter calls start date event handler
   *
   * @type {object}
   *
   * @memberof module:frontend/src/components/TimeFilter_test
   * @inner
   * @param {string} description - Calls start date eventhandler
   * @param {Function} testCode - Code that runs the test
   */
  test('typeing start date calls eventhandler', () => {
    const dateInput = component.findByTestId('startDate-date')

    waitFor(() => {
      fireEvent.change(dateInput, { target: { value: '2020-06-01' } })
      expect(handleStartDateChange.mock.calls).toHaveLength(1)
    })
  })

  /**.
   * Test that TimeFilter calls end date eventhandler
   *
   * @type {object}
   *
   * @memberof module:frontend/src/components/TimeFilter_test
   * @inner
   * @param {string} description - Calls end date eventhandler
   * @param {Function} testCode - Code that runs the test
   */
  test('typeing end date calls eventhandler', () => {
    const dateInput = component.findByTestId('endDate-date')

    waitFor(() => {
      fireEvent.change(dateInput, { target: { value: '2020-11-01' } })
      expect(handleStartDateChange.mock.calls).toHaveLength(1)
    })
  })
})