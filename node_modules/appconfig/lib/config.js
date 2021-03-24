var path = require('path')
var fs = require('fs')
var envmerge = require('./envmerge')

module.exports = config

function config (dir) {
  var files = fs.readdirSync(dir).filter(isjson)
  return files.reduce(readconfig, { __dirname: dir })
}

function readconfig (config, filename) {
  var fullpath = path.resolve(config.__dirname, filename)
  var json = require(fullpath)
  var basename = path.basename(filename, '.json')
  config[basename] = envmerge(json)
  return config
}

function isjson (filename) {
  return path.extname(filename) == '.json'
}
