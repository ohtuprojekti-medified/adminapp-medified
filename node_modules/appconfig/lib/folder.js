var path = require('path')
var fs = require('fs')

module.exports = folder

function folder () {

  // find main app package
  var main = module
  while (ispkg(main)) main = main.parent;

  // search for config folder
  var paths = main.filename.split(path.sep)
  var checks = []
  var pkgjson = 1

  while (paths.length - pkgjson > 0) {
    paths.pop()
    var root = paths.join(path.sep)
    var dirname = path.resolve(root, 'config')

    if (fs.existsSync(dirname)) return dirname

    var recount = fs.existsSync(path.resolve(root, 'package.json')) 
        && !('node_modules' in paths)
    if (recount) pkgjson = paths.length

    // for error message
    checks.push(dirname)
  }

  // cound't find config
  var message = 'config dir not found. looked for:\n' + checks.join('\n')
  throw new Error(message + '\n')
}

function ispkg (mod) {
  return mod.filename.split(path.sep).indexOf('node_modules') > -1
}
