export type InlineStyle = 'Italic' | 'Bold' | 'Struck' | 'Small' | 'Code' | 'Subscript' | 'Superscript' | 'Underline' | 'Normal'

export type TextNode = {
  type: 'Text',
  value: string,
  styles: Array<InlineStyle>
}

export type LineBreakNode = { type: 'LineBreak' }

export type LinkNode = {
  type: 'Link',
  value: Array<TextNode>,
  href: string,
  target?: ?string
}

// ESLint is going full crazy on me with flow. 
// eslint-disable-next-line no-undef
export type InlineNode = TextNode | LineBreakNode | LinkNode
