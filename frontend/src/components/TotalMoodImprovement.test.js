/**.
 * Tests for TotalMoodImprovement component
 *
 * @module src/components/TotalMoodImprovement_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires src/components/TotalMoodImprovement
 */
 import React from 'react'
 import '@testing-library/jest-dom/extend-expect'
 import { render, waitFor } from '@testing-library/react'
 import TotalMoodImprovement from './TotalMoodImprovement'
 
 /**.
  * Describe tests
  *
  * @type {object}
  * @function
  * @memberof module:src/components/TotalMoodImprovement_test
  * @param {string} description - Description of tests
  * @param {object} testCode - Code for tests
  */
 describe('<TotalMoodImprovement />', () => {
   let component
 
   /**.
    * Render TotalMoodImprovement
    *
    * @type {object}
    * @function
    * @memberof module:src/components/TotalMoodImprovement_test
    * @inner
    * @param {object} beforeEachCode - Code to be run before each test
    */
   beforeEach(() => {
     component = render(<TotalMoodImprovement />)
   })
 
   /**.
    * Test that TotalMoodImprovement is rendered
    *
    * @type {object}
    * @function
    * @memberof module:src/components/TotalMoodImprovement_test
    * @inner
    * @param {string} description - renders TotalMoodImprovement
    * @param {object} TestCode - Code that runs the test
    */
   test('renders TotalMoodImprovement', () => {
     waitFor(() => {
       expect(component.container.toHaveTextContent('Adminapp for monitoring moods'))
       expect(component.container.toHaveTextContent('Total Improvement'))
     })
   })
 })