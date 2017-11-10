var express = require('express')
var opn = require('opn')
var bodyParser = require('body-parser')

const AppPort = 18001
const SubPort = 18002
var app = express()
var subApp = express()

app.use(bodyParser.json())

app.use(express.static('../browser'))

app.get('/', (req, res, next) => {
  res.send(getHtml())
})

subApp.get('/jsonp', (req, res, next) => {
  let name = req.query.callback
  res.send(getScript(name))
})

function getHtml () {
  return (
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>jsonp</title>
      </head>
      <body>
        <script>
          window.test = function (data) {
            alert(data)
          }
        </script>
        <script src='http://127.0.0.1:${SubPort}/jsonp?callback=test'></script>
      </body>
    </html>
    `
  )
}

function getScript (name) {
  return (
    `
    window.${name}(12345)
    `
  )
}

app.listen(AppPort, (err) => {
  if (err) {
    console.log(err)
  } else {
    subApp.listen(SubPort, (err) => {
      if (err) {
        console.log(err)
      } else {
        opn(`http:127.0.0.1:${AppPort}`)
      }
    })
  }
})
