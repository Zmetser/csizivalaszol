/**
 * @flow
 *
 * All the usable nodes
 */

export type InlineStyle = 'Italic' | 'Bold' | 'Struck' | 'Small' | 'Code' | 'Subscript' | 'Superscript' | 'Underline' | 'Normal'

const TextNode = (value: string, styles: Array<InlineStyle>) => ({
  type: 'Text',
  value,
  styles
})

const LineBreak = () => ({ type: 'LineBreak' })

const Link = (value: Array<TextNode>, href: string, target?: ?string) => ({
  type: 'Link',
  value,
  href,
  target
})

export type InlineNode = TextNode | LineBreak | Link;

type ImageAttributes = { src: string, alt: string, width: number, height: number }
const Image = ({ src, alt, width, height }: ImageAttributes) => ({
  type: 'Image',
  src,
  alt,
  width,
  height
})

const Paragraph = (value: Array<InlineNode>) => ({
  type: 'Paragraph',
  value
})

module.exports = {
  TextNode,
  Paragraph,
  LineBreak,
  Link,
  Image
}
