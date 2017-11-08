// 读取根目录下info文件夹下所有文件的信息，如大小，时间，内容等
// api
// fs.read(fd, buffer, offset, length, position, callback)
// fs.readdir(path[, options], callback)
// fs.readFile(path[, options], callback)
// fs.stat(path, callback)

var fs = require('fs')
var path = require('path')

var resolve = function (p = '') {
  return path.join(__dirname, './info/src', p)
}

function getTime (time) {
  return `${time.getFullYear()}/${time.getMonth()}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
}

fs.readdir(resolve(), (err, files) => {
  if (err) {
    console.warn(err)
  } else {
    files.forEach(name => {
      fs.stat(resolve('/' + name), (err, info) => {
        console.log('name:' + name + ', size:' + info.size + 'byte, cteateTime:' + getTime(info.birthtime) + ', chaneTime:' + getTime(info.ctime))
      })
    })
  }
})
