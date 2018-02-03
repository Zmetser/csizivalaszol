/**
 * @flow
 */

import * as React from 'react'
import { UnknownNodeError } from '../errors'

import type { InlineNode } from '../types'

import {
  Text,
  Link,
  LineBreak
} from '../components'

function createInlineNode (node: InlineNode, index): React.Element<*> {
  switch (node.type) {
    case 'Text': return <Text node={node} key={index} />
    case 'Link': return <Link node={node} key={index} />
    case 'LineBreak': return <LineBreak key={index} />
    default: throw new UnknownNodeError(node)
  }
}
export default function renderInlineNodes (nodes: Array<InlineNode>): Array<React.Element<*>> {
  return nodes.map(createInlineNode)
}
