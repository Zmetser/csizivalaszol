/**
 * @flow
 */

import type {
  InlineStyle,
  InlineNode,
  TextNode,
  ImageNode,
  ListType,
  ListItem,
  ListNode
} from '../../../../messageBody/types'

const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { window } = new JSDOM('')
const { document, Element, HTMLImageElement, HTMLUListElement, HTMLOListElement } = window

const { isEmoticon, emoticonImageToUnicode } = require('./helpers/emoticon')

const {
  createTextNode,
  createParagraph,
  createLineBreak,
  createLink,
  createImage,
  createList
} = require('../../../../messageBody/nodes')

const {
  nodeName,
  isLineBreak,
  isInlineNode
} = require('../../../../messageBody/helpers/node')

function containsOnlyWhitespace (element) {
  const contents = element.innerHTML
  return !contents.replace(/([\u200B-\u200D\uFEFF\s]|<br>|&nbsp;)/g, '').trim().length
}

function paragraphizeNodes (nodes) {
  const iteratee = (iterator, openContainer, containers) => {
    const { done, value = [] } = iterator.next()

    if (done) {
      return containers.concat([openContainer])
    }

    const [, node] = value

    if (isInlineNode(node)) {
      const lastNode = openContainer.lastChild
      openContainer.appendChild(node.cloneNode())

      if (isLineBreak(node) && lastNode && isLineBreak(lastNode)) {
        return iteratee(iterator, document.createElement('p'), containers.concat([openContainer]))
      }

      return iteratee(iterator, openContainer, containers)
    } else if (nodeName(node) === 'img') {
      return iteratee(iterator, node, containers.concat([openContainer]))
    }

    // Append blocknodes after closing current container
    if (openContainer.childNodes.length) {
      containers = containers.concat([openContainer])
      openContainer = document.createElement('p')
    }
    return iteratee(iterator, openContainer, containers.concat([node]))
  }

  return iteratee(nodes.entries(), document.createElement('p'), [])
}

function nodeNameToStyle (nodeName: string): InlineStyle {
  switch (nodeName) {
    case 'b': return 'Bold'
    case 'code': return 'Code'
    case 'del': return 'Struck'
    case 'em': return 'Italic'
    case 'i': return 'Italic'
    case 's': return 'Struck'
    case 'small': return 'Small'
    case 'strike': return 'Struck'
    case 'strong': return 'Bold'
    case 'sub': return 'Subscript'
    case 'sup': return 'Superscript'
    case 'u': return 'Underline'
    default: return 'Normal'
  }
}

function exportTextNodes (nodes: NodeList<Node>): Array<TextNode> {
  const traverse = (iterator: Iterator<[number, Node]>, styles: Array<InlineStyle>, memo: Array<TextNode>) => {
    for (const [, node] of iterator) {
      if (nodeName(node) === '#text') {
        memo.push(createTextNode(node.textContent, styles))
      } else {
        traverse(node.childNodes.entries(), styles, memo)
      }
    }

    return memo
  }
  return traverse(nodes.entries(), [], [])
}

function exportInlineNodes (nodes: NodeList<Node>): Array<InlineNode> {
  const traverse = (iterator: Iterator<[number, Node]>, styles: Array<InlineStyle>, memo: Array<InlineNode>) => {
    for (const [, node] of iterator) {
      switch (nodeName(node)) {
        case '#text':
          memo.push(createTextNode(node.textContent, styles))
          break
        case 'a':
          if (node instanceof Element) {
            const href = node.getAttribute('href') || 'javascript:;'
            const content = exportTextNodes(node.childNodes)

            memo.push(createLink(content, href, '_blank'))
          }
          break
        case 'img':
          if (node instanceof HTMLImageElement) {
            const src = node.getAttribute('src')
            if (src && isEmoticon(src)) {
              memo.push(createTextNode(emoticonImageToUnicode(src), []))
            }
          }
          break
        case 'br':
          memo.push(createLineBreak())
          break
        case 'b':
        case 'code':
        case 'del':
        case 'em':
        case 'i':
        case 's':
        case 'small':
        case 'strike':
        case 'strong':
        case 'sub':
        case 'sup':
        case 'u':
          traverse(
            node.childNodes.entries(),
            styles.concat(nodeNameToStyle(nodeName(node))),
            memo)
          break
        default:
          traverse(node.childNodes.entries(), styles, memo)
          break
      }
    }

    return memo
  }
  return traverse(nodes.entries(), [], [])
}

function exportImage (imageElement: HTMLImageElement): TextNode | ImageNode | null {
  const src = imageElement.getAttribute('src')

  if (src) {
    if (isEmoticon(src)) {
      return createTextNode(emoticonImageToUnicode(src), [])
    } else {
      const alt = imageElement.getAttribute('alt')
      const width = parseInt(imageElement.getAttribute('width'), 10)
      const height = parseInt(imageElement.getAttribute('height'), 10)

      const imageAttributes = {
        src,
        ...(alt ? {alt} : null),
        ...(width ? {width} : null),
        ...(height ? {height} : null)
      }

      return createImage(imageAttributes)
    }
  }

  return null
}

function exportList (node: HTMLUListElement, listType: ListType): ListNode<ListType> {
  const traverse = (iterator: Iterator<[number, Node]>, memo: Array<ListItem>): Array<ListItem> => {
    for (const [, node] of iterator) {
      if (nodeName(node) === 'li') {
        memo.push(exportInlineNodes(node.childNodes))
      }
    }

    return memo
  }
  return createList(traverse(node.childNodes.entries(), []), listType)
}

module.exports = (html: string) => {
  const dom = new JSDOM('<!DOCTYPE html><article>' + html + '</article>')
  const post = dom.window.document.querySelector('article')
  const nodes = post.childNodes

  // Ensure everything is wrapped into a Top level block node (p, ul, ol)
  const containers = paragraphizeNodes(nodes)

  const body = containers.map((node) => {
    switch (nodeName(node)) {
      case 'p':
        return !containsOnlyWhitespace(node) ? createParagraph(exportInlineNodes(node.childNodes)) : null
      case 'img':
        return node instanceof HTMLImageElement ? exportImage(node) : null
      case 'ul':
        return node instanceof HTMLUListElement ? exportList(node, 'Bullet') : null
      case 'ol':
        return node instanceof HTMLOListElement ? exportList(node, 'Number') : null
    }
  }).filter((node) => Boolean(node))

  return body
}
