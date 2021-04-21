class Compile {
  constructor(el, vm) {
    this.$el = this.isElementNode(el)
    this.$vm = vm

    if (this.$el) {
      const fragment = this.nodeFragment(this.$el)

      this.compile(fragment)

      this.$el.appendChild(fragment)
    }
  }
  isElementNode (node, status) {
    const nodeType = node.nodeType === 1
    if (status) {
      return nodeType
    }  else if (nodeType) {
      return node
    }
    return document.querySelector(node)
  }
  isDirective (name) {
    return name.includes('v-')
  }
  nodeFragment (el) {
    const fragment = document.createDocumentFragment()
    while (el.firstChild) {
      fragment.appendChild(el.firstChild)
    }
    return fragment
  }
  compile (fragment) {
    const childNodes = fragment.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node, true)) {
        this.compileElement(node)
        this.compile(node)
      } else {
        this.compileText(node)
      }
    })
  }
  compileText (node) {
    const text = node.textContent
    const reg = /\{\{([^}]+)\}\}/g
    if (reg.test(text)) {
      CompileUtil['text'](node, this.$vm, text)
    }
  }
  compileElement (node) {
    const attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      const attrKey = attr.name
      if (this.isDirective(attrKey)) {
        const attrValue = attr.value
        const [,type] = attrKey.split('-')
        CompileUtil[type](node, this.$vm, attrValue)
      }
    })
  }
}

CompileUtil = {
  getVal (vm, expr) {
    expr = expr.split('.')
    return expr.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  },
  setVal(vm, expr, value) {
    expr = expr.split('.')
    return expr.reduce((prev, next, currentIndex) => {
      if (currentIndex === expr.length - 1) {
        return prev[next] = value
      }
      return prev[next]
    }, vm.$data)
  },
  getValText (vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      return this.getVal(vm, arguments[1])
    })
  },
  html () {},
  text (node, vm, expr) {
    const updateFn = this.updater['textUpdater']
    const value = this.getValText(vm, expr)
    expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      new Watcher(vm, arguments[1], (newValue) => {
        updateFn && updateFn(node, this.getValText(vm, expr))
      })
    })
    
    updateFn && updateFn(node, value)
  },
  model (node, vm, expr) {
    const updateFn = this.updater['modelUpdater']
    new Watcher(vm, expr, (newValue) => {
      updateFn && updateFn(node, this.getVal(vm, expr))
    })
    node.addEventListener('input', e => {
      const newValue = e.target.value
      this.setVal(vm, expr, newValue)
    })
    updateFn && updateFn(node, this.getVal(vm, expr))
  },
  updater: {
    textUpdater (node, value) {
      node.textContent = value
    },
    modelUpdater (node, value) {
      node.value = value
    }
  }
}