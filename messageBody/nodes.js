/**
 * @flow
 *
 * All the usable nodes
 */

import type {
  InlineStyle,
  TextNode,
  LineBreakNode,
  LinkNode,
  InlineNode
} from './types'

const createTextNode = (value: string, styles: Array<InlineStyle>): TextNode => ({
  type: 'Text',
  value,
  styles
})

const createLineBreak = (): LineBreakNode => ({ type: 'LineBreak' })

const createLink = (value: Array<TextNode>, href: string, target?: ?string): LinkNode => ({
  type: 'Link',
  value,
  href,
  target
})

type ImageAttributes = { src: string, alt: string, width: number, height: number }
const createImage = ({ src, alt, width, height }: ImageAttributes) => ({
  type: 'Image',
  src,
  alt,
  width,
  height
})

const createParagraph = (value: Array<InlineNode>) => ({
  type: 'Paragraph',
  value
})

module.exports = {
  createTextNode,
  createParagraph,
  createLineBreak,
  createLink,
  createImage
}
