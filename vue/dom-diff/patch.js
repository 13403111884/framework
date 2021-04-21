import { Element, render, setAttr } from './element'

let allPatches = null
const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
let INDEX = 0

function walk (node) {
  const currentPatch = allPatches[INDEX++]
  const childNodes = node.childNodes

  childNodes.forEach(child => walk(child))

  if (currentPatch) {
    doPatch(node, currentPatch)
  }
}

function doPatch(node, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case ATTRS:
        for (const key in patch.attrs) {
          const value = patch.attrs[key]
          if (value) {
            setAttr(node, key, value)
          } else {
            node.removeAttribute(key)
          }
        }
        break
      case TEXT:
        node.textContent = patch.text
        break
      case REMOVE:
        node.parentNode.removeChild(node)
        break
      case REPLACE:
        const newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode)
        node.parentNode.replaceChild(newNode, node)
        break
      default:
        break
    }
  })
}

export default function patch (node, patches) {
  allPatches = patches

  walk(node)
}