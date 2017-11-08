// 读取根目录下insert文件夹下src文件夹内index文件，并插入一段脚本log出来
// api
//   fs.readFile(path, callback)

var fs = require('fs')
var path = require('path')

var resolve = function (p = '') {
  return path.join(__dirname, './insert/src', p)
}

fs.readFile(resolve('/index.html'), (err, con) => {
  var ctx = con.toString().replace('</body>', `
    <script>
      console.log(123)
    </script>
  </body>
  `)
  console.log(ctx)
})
