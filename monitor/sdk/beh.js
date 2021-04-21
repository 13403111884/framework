const getIndex = (ele) => {
  const children = [].slice.call(ele.parentNode.children).filter(node => node.tagName === ele.tagName)
  let myIndex = null

  children.forEach((item, index) => {
    if (ele === item) {
      myIndex = index
    }
  })
  myIndex = `[${myIndex+1}]`
  const tagName = ele.tagName.toLocaleLowerCase()
  const myLabel = `${tagName}${myIndex}`
  return myLabel
}

const getXpath = (ele) => {
  let xpath = ''
  let currentEle = ele
  while (currentEle !== document.querySelector('body') && currentEle !== document.querySelector('html')) {
    if (xpath) {
      xpath = `/${getIndex(currentEle)}${xpath}`
    } else {
      xpath = `/${getIndex(currentEle)}`
    }
    currentEle = currentEle.parentNode
  }
  console.log(xpath)
  return currentEle
}

export default {
  init: (initFn) => {
    document.addEventListener('click', (e) => {
      const target = e.target
      const myLabel = getXpath(target)
      initFn(myLabel)
    }, false)
  }
}
