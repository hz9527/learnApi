var path = require('path')
var fs = require('fs')
var stream = require('stream')

// 压缩js

// var rs = fs.createReadStream(path.resolve(__dirname, './static/index.js'))
// var ws = fs.createWriteStream(path.resolve(__dirname, './static/index.min.js'))
// var ts = new stream.Transform({
//   transform (chunk, encoding, cb) {
//     var data = chunk.toString().replace(/\s/g, '')
//     this.push(data)
//     cb()
//   }
// })
//
// rs.pipe(ts).pipe(ws)

// 复制文件

var read = fs.createReadStream('./static/test.txt')
var write = fs.createWriteStream('./static/test_back.txt')

read.pipe(write)
