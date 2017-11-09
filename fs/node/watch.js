// watch 根目录下watch文件夹下的assets文件夹，并生成一张拼合图片放置在dist文件夹下

var fs = require('fs')
var path = require('path')
var images = require('images')

var resolve = (p = '') => path.join(__dirname, './watch' + p)

var html =
`
<!DOCTYPE html5>
<html>
  <head>
    <title>sprite</title>
    <style>
      .icon {display: inline-block;}
    </style>
    <link rel="stylesheet" href="./sprite.css"/>
  </head>
  <body>
    //content
  </body>
</html>
`

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
    let fragment = ''
    files = files.filter(item => /\.(png|jpe?g)$/.test(item))
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
      let n = files[i].split('.')
      n = n[0]
      css += `.icon-${n} {
        width: ${list[i].width}px;
        height: ${list[i].height}px;
        background-image: url('./sprite.png');
        background-position: 0 -${cur}px;
      }
      `
      fragment += `<div class="icon icon-${n}"></div>`
      cur += list[i].height + padding
      i++
    }
    spr.save(resolve('/' + output + '/sprite.png'))
    fs.writeFile(resolve('/' + output + '/sprite.css'), css, err => {
      if (err) {
        console.log(err)
      }
    })
    fs.writeFile(resolve('/' + output + '/test.html'), html.replace('//content', fragment), err => {
      if (err) {
        console.log(err)
      }
    })
  })
}


sprite('assets', 'dist', 5)
