/**.
 * Tests for config
 *
 * @constant
 * @module backend/tests/config_test
 * @requires backend/utils/config
 */
const config = require('../utils/config')

/**.
 * Run tests for config
 *
 * @type {object}
 * @memberof module:backend/tests/config_test
 * @param {string} description - config
 * @param {Function} tests - Function that runs tests
 */
describe('config', () => {
  /**.
   * Tests that the port of backend is correct
   *
   * @memberof module:backend/tests/config_test
   * @inner
   * @param {string} name - Name of the test
   * @param {Function} test - Test code
   */
  test('Backend PORT of 5000', () => {
    const result = config.PORT

    expect(result).toBe('5000')
  })
})