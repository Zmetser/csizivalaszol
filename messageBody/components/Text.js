/**
 * @flow
 * 
 * Create formatted text elements from TextNode structures.
 */

import { createElement } from 'react'
import type { TextNode, InlineStyle } from '../types'

function inlineStyleToTag (styleName: InlineStyle): string {
  switch (styleName) {
    case 'Italic': return 'em'
    case 'Bold': return 'strong'
    case 'Struck': return 's'
    case 'Small': return 'small'
    case 'Code': return 'code'
    case 'Subscript': return 'sub'
    case 'Superscript': return 'sup'
    case 'Underline': return 'u'
    default: return 'span'
  }
}

// NOTE: For whatever reason I get the Error: `'TextNode' is defined but never used  no-unused-vars`
//       If TextNode is assigned as the props type as is, this proxying however satisfies eslint.
type Props = TextNode
export default function Text ({ value, styles }: Props, key: string | number): React$Element<*> | string {
  const reversedStyles = styles.slice().reverse()
  return reversedStyles.reduce((prev, styleName, index) =>
    createElement(inlineStyleToTag(styleName), { key: styleName + key }, prev), value)
}
