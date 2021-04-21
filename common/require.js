const factories = {}
function define (moduleName, de, fa) {
  fa.de = de
  factories[moduleName] = fa
}
function require (mods, fn) {
  const res = mods.map(function (mod) {
    const fac = factories[mod]
    const de = fac.de
    let exports
    require(de, function () {
      exports = fac.apply(null, arguments)
    })
    
    return exports
  })
  fn.apply(null, res)
}

define('name', [], function () {
  return '你好'
})
define('age', ['name'], function (name) {
  return `${name}-9`
})

require(['name', 'age'], function (name, age) {
  console.log(name, age)
})
