// 将根目录下rename文件夹中文件重命名并放置到dist文件夹中，每次生成都先清空dist文件夹
// 发现rename api会移除原有图片，并覆盖同名文件
var fs = require('fs')
var path = require('path')

var resolve = (p = '') => path.join(__dirname, './rename', p)

fs.readdir(resolve('/src'), (err, files) => {
  if (err) return
  console.log(files)
  if (!fs.existsSync(resolve('/dist'))) {
    fs.mkdirSync(resolve('/dist'))
  }
  files.forEach((name, ind) => {
    let type = name.split('.')
    if (type.length > 1) {
      type = type[type.length - 1]
    } else {
      type = ''
    }
    fs.rename(resolve('/src/' + name), resolve('/dist/' + (ind + 1) + '.' + type), (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`rename ${name} to ${ind + '.' + type}`)
      }
    })
  })
})
