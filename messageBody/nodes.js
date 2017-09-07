/**
 * @flow
 *
 * All the usable nodes
 */

import type {
  ImageAttributes,
  ImageNode,
  InlineNode,
  InlineStyle,
  LineBreakNode,
  LinkNode,
  ParagraphNode,
  TextNode
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

const createImage = ({ src, alt, width, height }: ImageAttributes): ImageNode => ({
  type: 'Image',
  src,
  alt,
  width,
  height
})

const createParagraph = (value: Array<InlineNode>): ParagraphNode => ({
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
