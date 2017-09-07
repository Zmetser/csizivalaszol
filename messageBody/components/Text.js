/**
 * @flow
 * 
 * Create formatted text elements from TextNode structures.
 */

import * as React from 'react'
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

export default function Text ({ value, styles }: $Shape<TextNode>, key: React.Key): React.Element<*> | string {
  const reversedStyles = styles.slice().reverse()
  return reversedStyles.reduce((prev, styleName, index) =>
    React.createElement(inlineStyleToTag(styleName), { key: styleName + key }, prev), value)
}
