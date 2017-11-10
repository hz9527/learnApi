var child_process = require('child_process')
var fs = require('fs')
var path = require('path')
var childPid

function buildChild () {
  var child = child_process.fork('./mock/index.js')
  return child.pid
}

childPid = buildChild()

fs.watchFile(path.join(__dirname, './mock/config.js'), (err) => {
  if (childPid) {
    process.kill(childPid)
    childPid = null
    setTimeout(() => {
      childPid = buildChild()
    }, 3000)
  }
})
