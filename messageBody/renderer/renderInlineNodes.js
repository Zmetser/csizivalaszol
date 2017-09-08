/**
 * @flow
 */

import * as React from 'react'
import { UnknownNodeError } from '../errors'

import type { InlineNode } from '../types'

import {
  Text,
  Link
} from '../components'

function createInlineNode (node: InlineNode, index): React.Element<*> {
  switch (node.type) {
    case 'Text': return Text(node, index)
    case 'Link': return <Link {...node} key={index} />
    default: throw new UnknownNodeError(node)
  }
}
export default function renderInlineNodes (nodes: Array<InlineNode>): Array<React.Element<*>> {
  return nodes.map(createInlineNode)
}
