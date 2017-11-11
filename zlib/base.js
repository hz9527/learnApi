// 压缩index.js为index.min.js解压index.min.js
// zlib.createGzip createUnzip
// zlib.createDefalte createInflate

var zlib = require('zlib')
var fs = require('fs')

// var reader = fs.createReadStream('./static/index.js')
// var writer = fs.createWriteStream('./static/index.js.gz')
//
// var gzip = zlib.createDeflate()
//
// reader.pipe(gzip).pipe(writer)


var reader = fs.createReadStream('./static/index.js.gz')
var writer = fs.createWriteStream('./static/index_back.js')
var unzip = zlib.createInflate()

reader.pipe(unzip).pipe(writer)
