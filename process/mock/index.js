var express = require('express')
var mockConf = require('./config.js')
var bodyParser = require('body-parser')
var path = require('path')

var app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './testApi')))

mockConf.forEach(item => {
  var route = app.route(item.path)
  var methods = item.method
  if (typeof methods === 'string') {
    methods = [methods]
  }
  methods.forEach(m => {
    route[m]((req, res) => {
      var result
      if (typeof item.handler === 'function') {
        result = item.handler(req)
      } else {
        result = item.handler
      }
      res.send(JSON.stringify(result))
    })
  })
})

app.get('/testApi', (req, res) => {
  var list = mockConf.map(item => {
    return {
      method: item.method,
      path: item.path
    }
  })
  res.send(JSON.stringify(list))
})

app.listen(1800, (err) => {
  if (err) {
    return
  } else {
    console.log('mock build')
  }
})
