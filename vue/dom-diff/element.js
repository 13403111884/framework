export class Element {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

export function setAttr(node, key, value) {
  switch (key) {
    case 'value':
      if (['INPUT', 'TEXTAREA'].includes(node.tagName.toUpperCase())) {
        node.value = value
      } else {
        node.setAttribute(key, value)
      }
      break
    case 'style':
      node.style.cssText = value
      break
    default:
      node.setAttribute(key, value)
      break
  }
}

export function createElement (type, props, children) {
  return new Element(type, props, children)
}

export function render(eleObj) {
  const el = document.createElement(eleObj.type)
  for (const key in eleObj.props) {
    setAttr(el, key, eleObj.props[key])
  }
  eleObj.children.forEach(child => {
    child = (child instanceof Element) ? render(child) : document.createTextNode(child)
    el.appendChild(child)
  })
  return el
}

export function renderDom (el, target) {
  target.appendChild(el)
}
