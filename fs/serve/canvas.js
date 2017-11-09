var opn = require('opn')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')

var app = express()
app.use(express.static('../browser'))

app.use(bodyParser.json())
app.use(bodyParser.raw())

app.post('/upload', (req, res, next) => {
  var type = req.body.name.split('.')
  type = type[type.length - 1]
  type = 'jpg' ? 'jpeg' : type
  fs.writeFile(path.join(__dirname, '../static/' + req.body.name), req.body.data.replace(`data:image/${type};base64,`, ''), 'base64', (err) => {
    if (err) {
      console.log(err)
    }
    res.send({data: null})
  })
})

app.listen(1800, (err) => {
  if (err) {
    console.log(err)
  } else {
    opn('http://127.0.0.1:1800/canvas.html')
  }
})
