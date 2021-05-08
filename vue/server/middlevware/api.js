module.exports = async (ctx, next) => {
  console.log('ctxctxctxctx', ctx.request.header.cookie)
  const apiMap = {
    '/api/list': [
      { c: 1 },
      { c: 2 },
      { c: 3 },
      { c: 4 },
      { c: 5 },
      { c: 6 },
      { c: 7 },
      { c: 8 }
    ],
    '/api/detail': {
      id: 1,
      name: 'dddd',
      age: '20'
    }
  }
  
  for (let key in apiMap) {
    if (ctx.path.includes(key)) {
      ctx.body = apiMap[key]
      break
    }
  }

  return next()
}