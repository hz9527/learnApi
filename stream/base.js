// 读一个文件，并使用各种事件。当未open，data等都不会触发end close，因为开始默认为暂停状态

var fs = require('fs')

// var read = fs.createReadStream('./static/test.txt')
//
// read.on('open', (fd) => {
//   console.log('open file', fd)
// })
//
// read.on('data', (d) => {
//   console.log(d.toString())
//   read.pause() // stop
//   setTimeout(() => {
//     read.resume() // paly
//   }, 1000)
// })
//
// read.on('end', () => {
//   console.log('read end')
// })
//
// read.on('close', () => {
//   console.log('close file')
// })
//
// read.on('error', err => {
//   console.log(err)
// })

var write = fs.createWriteStream('./static/test_w.txt')

write.write('hehehehehehe', 'utf8')

write.end()

write.on('finish', () => {
  console.log('write end')
})
