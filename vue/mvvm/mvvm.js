class MVVM {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    if (this.$el) {
      new Observer(this.$data)
      this.proxy(this.$data)
      new Compile(this.$el, this)
    }
  }
  proxy (data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get () {
          return data[key]
        },
        set (newValue) {
          data[key] = newValue
        }
      })
    })
  }
}