/**
 * @flow
 */

const nodeName = (node: Node): string => node ? node.nodeName.toLowerCase() : ''

const isLineBreak = (node: Node): boolean => nodeName(node) === 'br'

const inlineNodeNames = ['#text', 'a', 'br', 'em', 'i', 'strong', 'b', 's', 'strike', 'del', 'small', 'code', 'sub', 'sup', 'u']
const isInlineNode = (node: Node): boolean => inlineNodeNames.indexOf(nodeName(node)) !== -1

module.exports = {
  nodeName,
  isLineBreak,
  isInlineNode
}
