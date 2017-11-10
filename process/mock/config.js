module.exports = [
  {
    method: 'get',
    path: '/getList',
    handler: {
      code: 0,
      codeMsg: 'success',
      data: [{}, {}]
    }
  },
  {
    method: ['post', 'put'],
    path: '/setList',
    handler: (req) => {
      // console.log(req)
      return {
        code: 0,
        codeMsg: 'success',
        data: null
      }
    }
  }
]
