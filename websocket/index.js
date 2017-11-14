var express = require('express')
var expressWs = require('express-ws')

var app = express()
app.use(express.static('./browser'))
expressWs(app)

var wsList = {}
app.ws('/socket', (ws, req) => {
  console.log(Object.keys(req), req.query)
  var key = Math.random().toString(32).slice(2)
  wsList[key] = ws
  ws.on('close', data => {
    wsList[key] = null
    delete wsList[key]
    console.log(data, 'close')
  })
})

// setInterval(() => {
//   Object.keys(wsList).forEach(key => {
//     console.log(key)
//     wsList[key].send('reload')
//   })
// }, 1000)

app.listen(18000, () => {
  console.log('serve run 18000')
})
