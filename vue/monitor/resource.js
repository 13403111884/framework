const onload = (fn) => {
  if (document.readyState === 'complete') {
    fn()
    return void 0
  }
  window.addEventListener('load', () => {
    fn()
  })
}

const resolvePerformanceResource = (resourceData) => {
  const r = resourceData || {}
  const o = {
    initiatorType: r.initiatorType, // 类型
    name: r.name, // 请求地址
    duration: parseInt(r.duration), // 

    // 链接过程
    redirect: r.redirectEnd - r.redirectStart, // 重定向时间
    dns: r.domainLookupEnd - r.domainLookupStart, // DNS查找
    connect: r.connectEnd - r.connectStart, // TCP链接
    network: r.connectEnd - r.startTime, // 网络总耗时

    // 接受过程
    send: r.responseStart - r.requestStart, // 发送开始到接受的总时长
    receive: r.responseEnd - r.responseStart, // 接受的总时长
    request: r.responseEnd - r.requestStart, // 接受的总耗时

    // 核心指标
    ttfb: r.responseStart - r.requestStart, // 首字节时间

  }
  return o
}

const resolveEntries = (entries) => {
  return entries.map(item => resolvePerformanceResource(item))
}

export default {
  init: (initFn) => {
    const performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance;
    if (!performance || !performance.getEntries) {
      return void 0;
    }
    if (window.PerformanceObserver) {
      const observer = new window.PerformanceObserver(list => {
        try {
          const entries = list.getEntries()
          const entriesData = resolveEntries(entries)
          initFn(entriesData)
        } catch (e) {
          console.error(e)
        }
      })
      observer.observe({ entryTypes: ['resource'] })
    }
    onload(() => {
      // onload之后获取资源信息
      const entries = performance.getEntries('resource')
      const entriesData = resolveEntries(entries)
      initFn(entriesData, 'onload')
    })
  }
}