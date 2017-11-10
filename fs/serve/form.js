var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')({ dest: './static/'})

var app = express()

app.use(express.static('../browser'))
app.use(bodyParser.json()) // application/json
app.use(bodyParser.urlencoded({extended: false})) // application/x-www-form-urlencoded

app.use(multer.any())
// app.use(bodyParser.raw())

app.post('/upload', (req, res, next) => {
  console.log(req.files)
  res.end()
})

app.listen(18005, (err) => {
  if (err) {
    console.log(err)
  }
})
