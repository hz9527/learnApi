var fs = require('fs')
var superagent = require('superagent')

// superagent.get('http://www.shixiseng.com/interns?p=2')
//   .set({
//     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
//     'Content-Type': 'text/plain; charset=UTF-8'
//   })
//   .end((err, data) => {
//     console.log(err)
//     data.text = data.text.replace(/\n/g, '')
//     fs.writeFile('./static/index.html', data.text, (err) => {
//       console.log(123)
//     })
//   })

// 2017-11-13T04%3A06%3A05.430Z
// 2017-11-12T13%3A57%3A08.062Z
// 2017-11-12T09%3A17%3A40.242Z
// 2017-11-12T09:17:40.242Z
superagent.get('https://timeline-merger-ms.juejin.im/v1/get_entry_by_timeline?src=web&uid=571dc56071cfe4006b558696&device_id=1510540333211&token=eyJhY2Nlc3NfdG9rZW4iOiI0REdFc3lmVncyb1BpdkpRIiwicmVmcmVzaF90b2tlbiI6ImxqQWFnb2ZaQXg3cGU1RnciLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&limit=20&before=2017-11-13T18%3A23%3A15.460Z&category=all&recomment=1')
  .set({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Content-Type': 'text/plain; charset=UTF-8'
  })
  .end((err, data) => {
    console.log(err)
    var con = JSON.parse(data.text).d
    var list = con.entrylist
    list.forEach(item => {
      console.log(item.title)
    })
    // fs.writeFile('./static/list.js', data.text, (err) => {
    //   console.log(123)
    // })
  })
