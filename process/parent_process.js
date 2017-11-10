var child_process = require('child_process')
var path = require('path')

// 使用spawn创建子进程并log stdout stderr
// // var child = child_process.spawn('node', ['./child_process.js'])
// var child = child_process.spawn('ls')
// child.stdout.on('data', (data) => {
//   console.log(data.toString())
// })
// child.stderr.on('data', (data) => {
//   console.log(data.toString())
// })
// child.on('close', (code) => {
//   console.log(code)
// })


// 使用exec创建子进程并log stdout stderr
// child_process.exec('node ./child_process.js', (err, stdout, stderr) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('stdout:', stdout)
//     console.log('stderr:', stderr)
//   }
// })

// 使用execFile创建子进程并log stdout stderr file其实是值bash脚本而不是js，因此使用command实现
// child_process.execFile('node', ['./child_process.js'], (err, stdout, stderr) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('stdout:', stdout)
//     console.log('stderr:', stderr)
//   }
// })

// 使用fork创建子进程并通信，需要手动结束进程，因为子进程在监听message，因此子进程不会结束，但是子进程结束父进程并不会因为监听了message而不结束
var child = child_process.fork('./child_process.js')
child.on('message', (data) => {
  console.log('parent accept messge, content is', JSON.stringify(data))
})
child.send('child, you listen')
setTimeout(() => {
  // child.disconnect() // 断开链接，并未销毁子进程
  process.kill(child.pid) // 杀掉子进程
}, 2000)


console.log(process.channel)
