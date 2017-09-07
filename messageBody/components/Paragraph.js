/**
 * @flow
 */

import * as React from 'react'
import type { ParagraphNode } from '../types'

import renderInlineNodes from '../renderer/renderInlineNodes'

export default function Paragraph ({ value }: $Shape<ParagraphNode>, key: React.Key): React.Element<'p'> {
  return <p key={key}>{renderInlineNodes(value)}</p>
}
