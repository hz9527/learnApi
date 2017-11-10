var opn = require('opn')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')

var app = express()
app.use(express.static('../browser'))
app.use(express.static('../static'))

app.use(bodyParser.json())
app.use(bodyParser.raw())

app.post('/upload', (req, res, next) => {
  var type = req.body.name.split('.')
  var data
  type = type[type.length - 1]
  type = 'jpg' ? 'jpeg' : type
  data = req.body.data.replace(`data:image/${type};base64,`, '')
  fs.writeFile(path.join(__dirname, '../static/' + req.body.name), data, 'base64', (err) => {
    if (err) {
      console.log(err)
      res.send({data: null, code: -1, codeMsg: 'fail'})
    } else {
      res.send({data: `http://127.0.0.1:1800/${req.body.name}`, code: 0, codeMsg: 'success'})
    }
  })
})

app.listen(1800, (err) => {
  if (err) {
    console.log(err)
  } else {
    opn('http://127.0.0.1:1800/canvas.html')
  }
})
