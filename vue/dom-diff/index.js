import { createElement, render, renderDom } from './element'
import diff from './diff'
import patch from './patch.js'

const vNode = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['aaaaaaa']),
  createElement('li', { class: 'item' }, ['bbbbbbb']),
  createElement('li', { class: 'item' }, ['ccccccc'])
])

const vNode2 = createElement('ul', { class: 'list-g' }, [
  createElement('li', { class: 'item' }, ['1111111']),
  createElement('li', { class: 'item' }, ['bbbbbbb']),
  createElement('li', { class: 'item' }, ['3333333'])
])

const el = render(vNode)
console.log(window.root)
renderDom(el, window.root || document.querySelector('body'))

const patches = diff(vNode, vNode2)
patch(el, patches)
