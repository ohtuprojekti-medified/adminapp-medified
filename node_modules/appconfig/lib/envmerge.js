var merge = require('deepmerge')

module.exports = envmerge

function envmerge (json) {
  var env = process.env.NODE_ENV || 'development'
  var value = json[env]
  if (value && Object(value) !== value) return value
  return merge(json, value || {})
}
