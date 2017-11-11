// 将使用事件方式将static中index.js压缩

var fs = require('fs')

var reader = fs.createReadStream('./static/index.js')
var writer = fs.createWriteStream('./static/index.minByMyTrans.js')

reader.on('data', (bf) => {
  writer.write(bf.toString().replace(/\s/g, ''), 'utf8')
})

reader.on('end', () => {
  console.log('read end')
  writer.end()
})

writer.on('finish', () => {
  console.log('write finish')
})
