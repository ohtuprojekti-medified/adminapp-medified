var assert = require('assert')
var path = require('path')
var fs = require('fs')
var folder = require('../lib/folder')

describe('lib/folder', function () {
  describe('no config folder', function () {
    it('should throw error', function () {
      assert.throws(folder)
    })
  })

  describe('with config folder', function () {
    var config = path.resolve(__dirname, '../config')

    before(function () {
      fs.mkdirSync(config)
    })

    it('should be the config folder', function () {
      assert.equal(config, folder())
    })

    after(function () {
      fs.rmdirSync(config)
    })
  })
})
