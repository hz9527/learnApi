console.log(process.argv, process.argv0)

var list = process.argv.slice(2)
console.dir(list)

console.log('process.execArgv', process.execArgv)
