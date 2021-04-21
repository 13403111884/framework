(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var perf = {
    init: (initFn) => {

      let isDOMReady = false;
      let isOnLoad = false;
      const cycleTime = 10;

      const Util = {
        getPerfData: (p) => {
          const data = {
            // 网络建联
            prevPage: p.fetchStart - p.navigationStart, // 上一个页面的时间
            redirect: p.redirectEnd - p.redirectStart, // 重定向时间
            dns: p.domainLookupEnd - p.domainLookupStart, // DNS查找时间
            connect: p.connectEnd - p.connectStart, // TCP建联时间
            network: p.connectEnd - p.navigationStart, // 网络总耗时

            // 网络接受
            send: p.responseStart - p.requestStart, // 前端从发送到接收的时间
            receive: p.responseEnd - p.responseStart, // 接受数据用时
            request: p.responseEnd - p.requestStart, // 请求页面的总耗时 

            // 前端渲染
            dom: p.domComplete - p.domLoading, // dom解析时间
            loadEvent: p.loadEventEnd - p.loadEventStart, // loadEvent时间
            frontend: p.loadEventEnd - p.domLoading, // 前端总时间

            // 关键阶段
            load: p.loadEventEnd - p.navigationStart, // 页面完全加载时间 
            domReady: p.domContentLoadedEventStart - p.navigationStart, // DOM准备时间
            interactive: p.domInteractive - p.navigationStart, // 可操作时间
            ttfb: p.responseStart - p.navigationStart, // 首字节时间

            // 
          };
          return data
        },
        domReady: (fn) => {
          if (isDOMReady === true) {
            return void 0
          }
          let timer = null;
          const runCheck = () => {
            if (performance.timing.domComplete) {
              clearTimeout(timer);
              fn();
              isDOMReady = true;
              // 停止循环检测；运行fn
            } else {
              // 再去循环检测
              timer = setTimeout(runCheck, cycleTime);
            }
          };
          if (document.readyStart === 'interactive') {
            fn();
            return void 0
          }

          document.addEventListener('DOMContentLoaded', () => {
            runCheck();
          });
        },
        onLoad: (fn) => {
          if (isOnLoad === true) {
            return void 0
          }
          let timer = null;
          const runCheck = () => {
            if (performance.timing.loadEventEnd) {
              clearTimeout(timer);
              fn();
              isOnLoad = true;
              // 停止循环检测；运行fn
            } else {
              // 再去循环检测
              timer = setTimeout(runCheck, cycleTime);
            }
          };
          if (document.readyStart === 'interactive') {
            fn();
            return void 0
          }

          window.addEventListener('load', () => {
            runCheck();
          });
        }
      };
      const performance = window.performance;

      Util.domReady(() => {
        const perfData = Util.getPerfData(performance.timing);
        perfData.type = 'domReady';
        initFn(perfData);
        // console.debug(perfData)
        // debugger
      });

      Util.onLoad(() => {
        const perfData = Util.getPerfData(performance.timing);
        perfData.type = 'onLoad';
        initFn(perfData);
        console.debug(perfData);
        // debugger
      });
    }
  };

  const onload = (fn) => {
    if (document.readyState === 'complete') {
      fn();
      return void 0
    }
    window.addEventListener('load', () => {
      fn();
    });
  };

  const resolvePerformanceResource = (resourceData) => {
    const r = resourceData || {};
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

    };
    return o
  };

  const resolveEntries = (entries) => {
    return entries.map(item => resolvePerformanceResource(item))
  };

  var resource = {
    init: (initFn) => {
      if (window.PerformanceObserver) {
        const observer = new window.PerformanceObserver(list => {
          try {
            const entries = list.getEntries();
            const entriesData = resolveEntries(entries);
            initFn(entriesData);
          } catch (e) {
            console.error(e);
          }
        });
        observer.observe({ entryTypes: ['resource'] });
      }
      onload(() => {
        // onload之后获取资源信息
        const entries = performance.getEntries('resource');
        const entriesData = resolveEntries(entries);
        initFn(entriesData, 'onload');
      });
    }
  };

  var xhrHook = {
    init: (initFn) => {
      const xhr = window.XMLHttpRequest;
      if (xhr._eagle_monitor === true) {
        return void 0
      }
      xhr._eagle_monitor = true;

      const _originOpen = xhr.prototype.open;
      xhr.prototype.open = function (method, url, async, user, password) {
        this._eagle_xhr_info = {
          method, url, async, user, password, status: null
        };
        
        return _originOpen.apply(this, arguments)
      };

      const _originSend = xhr.prototype.send;
      xhr.prototype.send = function () {
        this._eagle_start_time = Date.now();

        const ajaxEnd = (eventType) => () => {
          if (this.response) {
            let responseSize = null;
            switch (this.responseType) {
              case 'json': 
                responseSize = JSON.stringify(this.response).length;
                break
              case 'arraybuffer': 
                responseSize = this.response.byteLength;
                break
              default:
                responseSize = this.responseText.length;
            }
            this._eagle_xhr_info.event = eventType;
            this._eagle_xhr_info.status = this.status;
            this._eagle_xhr_info.success = this.status === 200;
            this._eagle_xhr_info.duration = Date.now() - this._eagle_start_time;
            this._eagle_xhr_info.responseSize = responseSize;
            this._eagle_xhr_info.requestSize = value ? value.length : 0;
            this._eagle_xhr_info.type = 'xhr';
            initFn(this._eagle_xhr_info);
          }
        };

        this.addEventListener('load', ajaxEnd('load'), false);
        this.addEventListener('error', ajaxEnd('error'), false);
        this.addEventListener('abort', ajaxEnd('abort'), false);

        return _originSend.apply(this, arguments)
      };

      if (window.fetch) {
        const _origin_fetch = window.fetch;

        window.fetch = function () {
          const startTime = Date.now();
          const args = [].slice.call(arguments);

          let method = 'GET';
          let url = null;

          const fetchInput = args[0];
          if (typeof fetchInput === 'string') {
            url = fetchInput;
          } else if ('Request' in window && fetchInput instanceof window.Request) {
            url = fetchInput.url;
            method = fetchInput.method || method;
          } else {
            url = `${fetchInput}`;
          }

          const eagleFetchData = {
            method, url, status: null
          };

          return _origin_fetch.apply(this, args).then(function (response) {
            eagleFetchData.status = response.status;
            eagleFetchData.type = 'fetch';
            eagleFetchData.duration = Date.now() - startTime;

            initFn(eagleFetchData);
            return response
          })
        };
      }
    }
  };

  const formatError = (errorObj) => {
    const col = window.column || window.colNumber;
    const row = window.line || window.lineNumber;
    const name = errorObj.name;
    const message = errorObj.message;

    const { stack } = errorObj;

    if (stack) {
      const matchUrl = stack.match(/[(http)(https)]?:\/\/[^\n]+/);
      const urlFirstSTack = matchUrl && matchUrl.length ? matchUrl[0]: '';
      const regUrlCheck = /[(http)(https)]?:\/\/(\S)*\.js/;

      let resourceUrl = '';
      if (regUrlCheck.test(urlFirstSTack)) {
        resourceUrl = urlFirstSTack.match(regUrlCheck)[0];
      }

      let stackCol = null;
      let stackRow = null;
      const posStack = urlFirstSTack.match(/:(\d+):(\d+)/);
      if (posStack && posStack.length >= 3) {
        [, stackCol, stackRow] = posStack;
      }
      return {
        content: stack,
        col: Number(col || stackCol),
        row: Number(row || stackRow),
        name, message, resourceUrl
      }
    }

    return {
      row, col, message, name
    }
  };

  var errorCatch = {
    init: (initFn) => {
      const _origin_error = window.onerror;
      window.onerror = function(message, source, lineno, colno, error) {
        const errorInfo = formatError(error);
        errorInfo._message = message;
        errorInfo._source = source;
        errorInfo._lineno = lineno;
        errorInfo._colno = colno;
        errorInfo._error = error;
        initFn(errorInfo, 'error');
        errorInfo.type = 'error';
        _origin_error && _origin_error.apply(window, arguments);
      };

      let _originOnunhandledrejection = window.onunhandledrejection;
      window.onunhandledrejection = (...arg) => {
        let e = arg[0];
        let reason = e.reason;
        initFn({
          type: e.type || 'unhandledrejection',
          reason
        }, 'unhandledrejection');
        _originOnunhandledrejection && _originOnunhandledrejection.apply(window, arg);
      };
    }
  };

  const getIndex = (ele) => {
    const children = [].slice.call(ele.parentNode.children).filter(node => node.tagName === ele.tagName);
    let myIndex = null;

    children.forEach((item, index) => {
      if (ele === item) {
        myIndex = index;
      }
    });
    myIndex = `[${myIndex+1}]`;
    const tagName = ele.tagName.toLocaleLowerCase();
    const myLabel = `${tagName}${myIndex}`;
    return myLabel
  };

  const getXpath = (ele) => {
    let xpath = '';
    let currentEle = ele;
    while (currentEle !== document.querySelector('body') && currentEle !== document.querySelector('html')) {
      if (xpath) {
        xpath = `/${getIndex(currentEle)}${xpath}`;
      } else {
        xpath = `/${getIndex(currentEle)}`;
      }
      currentEle = currentEle.parentNode;
    }
    console.log(xpath);
    return currentEle
  };

  var beh = {
    init: (initFn) => {
      document.addEventListener('click', (e) => {
        const target = e.target;
        const myLabel = getXpath(target);
        initFn(myLabel);
      }, false);
    }
  };

  beh.init((behData, type) => {
    // 行为监测
    console.log('beh', behData, type);
  });

  errorCatch.init((resourceData, type) => {
    // 错误监测
    console.log('errorCatch', resourceData, type);
  });

  xhrHook.init((resourceData, type) => {
    // 接口监测
    console.log('xhrHook', resourceData, type);
  });

  resource.init((resourceData, type) => {
    // 资源监测
    console.log('resource', resourceData, type);
  });

  perf.init((perfData) => {
    // 页面监测
    console.log('perf', perfData);
  });

})));
//# sourceMappingURL=bundle.umd.js.map
