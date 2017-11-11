var child_process = require('child_process')

var childPid

function build () {
  var child = child_process.fork('./serve.js')

  // child.on('message', (msg) => {
  //   console.log(msg)
  //   if (msg === 'exit') {
  //     setTimeout(() => {
  //       childPid = build()
  //     }, 1000)
  //   }
  // })
  child.on('close', (code) => {
    if (code === 0) {
      console.log('child exit()')
    } else {
      console.log('child err')
    }
    setTimeout(() => {
      childPid = build()
    }, 1000)
  })
  return child.pid
}

childPid = build()

// setTimeout(() => {
//   if (childPid) {
//     process.kill(childPid)
//     childPid = null
//     console.log('parent kill child')
//   }
// }, 8000)
