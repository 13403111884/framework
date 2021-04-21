const koa = require('koa')
const serve = require('koa-static')
const API = require('./middlevware/api')

const app = new koa()
const port = 3003
app.use(API)
app.use(serve(`${__dirname}/client`))

app.listen(port, () => {
  console.log(`${port} is listen`)
})