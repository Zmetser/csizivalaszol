/**
 * @flow
 */

import * as React from 'react'
import type { ParagraphNode } from '../types'

import renderInlineNodes from '../renderer/renderInlineNodes'

type Props = { node: ParagraphNode }
export default function Paragraph ({ node }: Props): React.Element<'p'> {
  return <p>{renderInlineNodes(node.value)}</p>
}
