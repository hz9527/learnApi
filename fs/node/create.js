// 在根目录下create文件夹下创建dist文件夹，创建一个index.html并复制src中文件到该目录下，执行前清空文件夹
// api
//   fs.existsSync(path)
//   fs.mkdir(path[, options], callback)
//   fs.writeFile(path, data[, options], callback) // write会自动替换

var fs = require('fs')
var path = require('path')

var resolve = (p = '') => path.join(__dirname, './create/dist', p)

function checkFile (name, callback) {
  // check dir
  if (fs.existsSync(resolve())) {
    callback()
  } else {
    fs.mkdir(resolve(), (err) => {
      if (err) {
        console.log(err)
      } else {
        callback()
      }
    })
  }
}

function createHtml () {
  var html =
`<!DOCTYPE html>
<html>
  <head>
    <title>create file</title>
  </head>
  <body></body>
</html>`

  fs.writeFile(resolve('/index.html'), html, (err, f) => {
    console.log(err, f)
  })
}

function copyImage () {
  fs.readdir(path.resolve(__dirname, './create/src'), (err, files) => {
    files.forEach(file => {
      checkFile(file, () => {
        fs.readFile(path.resolve(__dirname, './create/src/', file), (err, fd) => {
          fs.writeFile(resolve('/' + file), fd, (err) => {
            if (err) {
              console.log(err)
            } else {
              console.log('create file' + file)
            }
          })
        })
      })
    })
  })
}



checkFile('index.html', createHtml)
copyImage()
