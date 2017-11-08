// watch 根目录下watch文件夹下的assets文件夹，并生成一张拼合图片放置在dist文件夹下

var fs = require('fs')
var path = require('path')
var images = require('images')

var resolve = (p = '') => path.join(__dirname, './watch' + p)

function sprite () {
  fs.readdir(resolve('/assets'), (err, files) => {
    if (!fs.existsSync(resolve('/dist'))) {
      fs.mkdirSync(resolve('/dist'))
    }

  })
}


sprite()
