import perf from './perf.js'
import resource from './resource'
import xhrHook from './xhrHook'
import errorCatch from './errorCatch'
import beh from './beh'



beh.init((behData, type) => {
  // 行为监测
  console.log('beh', behData, type)
})

errorCatch.init((resourceData, type) => {
  // 错误监测
  console.log('errorCatch', resourceData, type)
})

xhrHook.init((resourceData, type) => {
  // 接口监测
  console.log('xhrHook', resourceData, type)
})

resource.init((resourceData, type) => {
  // 资源监测
  console.log('resource', resourceData, type)
})

perf.init((perfData) => {
  // 页面监测
  console.log('perf', perfData)
})
