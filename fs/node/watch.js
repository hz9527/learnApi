// watch 根目录下watch文件夹下的assets文件夹，并生成一张拼合图片放置在dist文件夹下

var fs = require('fs')
var path = require('path')
var images = require('images')

var resolve = (p = '') => path.join(__dirname, './watch' + p)

function sprite (input, output, padding) {
  fs.readdir(resolve('/' + input), (err, files) => {
    if (!fs.existsSync(resolve('/' + output))) {
      fs.mkdirSync(resolve('/' + output))
    }
    let list = []
    let tw = 0
    let th = 0
    let cur = padding
    let spr = null
    let i = 0
    let css = ''
    files.forEach(name => {
      let img = images(resolve('/' + input + '/' + name))
      let w = img.width()
      let h = img.height()
      list.push({
        width: w,
        height: h
      })
      tw = tw > w ? tw : w
      th += h + padding * 2
      images.gc()
    })
    spr = images(tw, th)
    while (i < list.length) {
      spr.draw(images(resolve('/' + input + '/' + files[i])), 0, cur)
      css += `.icon-${files[i].replace('.png', '')} {
        width: ${list[i].width}px;
        height: ${list[i].height}px;
        background-image: url('./sprite.png');
        background-position: 0 -${cur}px;
      }
      `
      cur += list[i].height + padding
      i++
    }
    spr.save(resolve('/' + output + '/sprite.png'))
    fs.writeFile(resolve('/' + output + '/sprite.css'), css, err => {
      if (err) {
        console.log(err)
      }
    })
  })
}


sprite('assets', 'dist', 5)
