// watch 根目录下watch文件夹下的assets文件夹，并生成一张拼合图片放置在dist文件夹下

var fs = require('fs')
var path = require('path')

var resolve = (p = '') => path.join(__dirname, './watch' + p)

function sprite () {
  fs.readdir(resolve('/assets'), (err, files) => {
    if (!fs.existsSync(resolve('/dist'))) {
      fs.mkdirSync(resolve('/dist'))
    }
    // fs.writeFileSync(resolve('/dist/sprite.png'), '')
    append(files, 0, '')
  })
}

function append (list, i, data) {
  if (i >= list.length) {
    console.log(data)
    fs.writeFile(resolve('/dist/sprite.png'), data, (err) => {
      console.log(err)
    })
    return
  }
  fs.readFile(resolve('/assets/' + list[i]), (err, f) => {
    data += f
    append(list, ++i, data)
  })
}

sprite()
