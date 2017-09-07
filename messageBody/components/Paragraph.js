/**
 * @flow
 */

import React from 'react'
import type { InlineNode } from '../types'

import renderInlineNodes from '../renderer/renderInlineNodes'

type Props = {
  value: Array<InlineNode>
}

export default function Paragraph ({ value }: Props) {
  return <p>{renderInlineNodes(value)}</p>
}
