let fs = require('fs')

function req (moduleName) {
  const content = fs.readFileSync(moduleName, 'utf8')
  console.log('content', content)

  const fn = new Function('exports', 'module', 'require', '__dirname', '__filename', `${content} \n return module.exports`)

  const module = {
    exports: {}
  }

  return fn(module.exports, module, req, __dirname, __dirname)
}

const str = req('./a.js')
console.log(str)