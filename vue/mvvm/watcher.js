class Watcher {
  constructor (vm, expr, cb) {
    this.$vm = vm
    this.$expr = expr
    this.$cb = cb

    this.value = this.get()
  }
  get () {
    Dep.target = this
    const value = this.getVal(this.$vm, this.$expr)
    Dep.target = null
    return value
  }
  getVal (vm, expr) {
    expr = expr.split('.')
    return expr.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  }
  update () {
    const newValue = this.getVal(this.$vm, this.$expr)
    const oldValue = this.value
    if (newValue !== oldValue) {
      this.$cb(newValue)
    }
  }
}