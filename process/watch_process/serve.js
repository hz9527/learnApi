var express = require('express')

var app = express()

var i = 0

process.on('exit', (code) => {
  console.log('child exit')
  process.send('exit')
})

setInterval(() => {
  if (i < 10) {
    console.log(i++)
  } else {
    // process.exit()
    console.log(fail)
  }
}, 500)

app.listen(17000, (err) => {
  if (err) {
    console.log(17000)
  } else {
    console.log('serve run in port 17000')
  }
})
