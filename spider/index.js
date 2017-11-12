var fs = require('fs')
var superagent = require('superagent')

superagent.get('http://www.shixiseng.com/interns?p=2')
  .set({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Content-Type': 'text/plain; charset=UTF-8'
  })
  .end((err, data) => {
    console.log(err)
    fs.writeFile('./static/index.html', data.text, (err) => {
      console.log(123)
    })
  })
