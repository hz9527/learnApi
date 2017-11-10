// 只有fork的子进程才能监听message与send
process.on('message', (data) => {
  console.log('child process log: ', data)
  process.send({name: 'child_process', value: 'hello world'})
})
setTimeout(() => {
  console.log(1)
}, 3000)

console.log('test')
