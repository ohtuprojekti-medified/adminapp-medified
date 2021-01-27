const { TestScheduler } = require('jest')
const config = require('../utils/config')

test('Backend PORT of 5000', () => {
    const result = config.PORT

    expect(result).toBe("5000")
})