const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
let INDEX = 0


function diffAttr(oldAttrs, newAttrs) {
  let patch = {}
  for (const key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]
      
    }
  }
  for (const key in newAttrs) {
    if (!oldAttrs.hasOwnProperty([key])) {
      patch[key] = newAttrs[key]
    }
  }
  return patch
}

function diffChildren(oldChildren, newChildren, index, patches) {
  oldChildren.forEach((child, childIndex) => {
    walk(child, newChildren[childIndex], ++INDEX, patches)
  })
}

function isString (node) {
  return Object.prototype.toString.call(node) === '[object String]'
}

function walk(oldNode, newNode, index, patches) {
  const currentPatch = []
  if (!newNode) {
    currentPatch.push({ type: REMOVE, index })
  } else if (isString(oldNode) && isString(newNode)) {
    if (oldNode !== newNode) {
      currentPatch.push({ type: TEXT, text: newNode })
    }
  } else if (oldNode.type === newNode.type) {
    const attrs = diffAttr(oldNode.props, newNode.props)
    if (Object.keys(attrs).length) {
      currentPatch.push({ type: ATTRS, attrs })
    }
    diffChildren(oldNode.children, newNode.children, index, patches)
  } else {
    currentPatch.push({ type: REPLACE, newNode })
  }
  if (currentPatch.length) {
    patches[index] = currentPatch
  }
}

export default function diff (oldTree, newTree) {
  const patches = {}
  let index = 0
  walk(oldTree, newTree, index, patches)
  return patches
}
