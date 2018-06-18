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
  TextNode,
  ListType,
  ListItem,
  ListNode
} from './types'

export const createTextNode = (value: string, styles: Array<InlineStyle>): TextNode => ({
  type: 'Text',
  value,
  styles
})

export const createLineBreak = (): LineBreakNode => ({ type: 'LineBreak' })

export const createLink = (value: Array<TextNode>, href: string, target?: ?string): LinkNode => ({
  type: 'Link',
  value,
  href,
  target
})

export const createImage = ({ src, alt, width, height }: ImageAttributes): ImageNode => ({
  type: 'Image',
  src,
  alt,
  width,
  height
})

export const createParagraph = (value: Array<InlineNode>): ParagraphNode => ({
  type: 'Paragraph',
  value
})

export function createList<T: ListType> (items: Array<ListItem>, listType: T): ListNode<T> {
  return {
    type: 'List',
    listType,
    items
  }
}
