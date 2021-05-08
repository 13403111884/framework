const koa = require('koa')
const serve = require('koa-static')
const parser = require('koa-bodyparser')
const cors = require('koa2-cors')
const catchError = require('./middlevware/exception')
const API = require('./middlevware/api')

const app = new koa()
const port = 3003

app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      // console.log('ctxctxctxctx', ctx)
      const whiteList = ['http://www.elegantwalking.com', 'http://crm.elegantwalking.com'] //可跨域白名单
      const host = ctx.header.host
      const origin = ctx.header.origin
      if (host.includes('localhost')) {
        return '*'
      }
      if (origin) {
        return whiteList.includes(origin) ? origin : 'http://localhost:3000'
      }
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
)
app.use(catchError)
app.use(parser())
app.use(API)
app.use(serve(`${__dirname}/client`))

app.listen(port, () => {
  console.log(`${port} is listen`)
})