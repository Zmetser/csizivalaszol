/**
 * @flow
 */

import * as React from 'react'

import type { InlineNode } from '../types'

import {
  Text,
  Link
} from '../components'

function createInlineNode (node: InlineNode, index): ?(React.Element<any> | string) {
  switch (node.type) {
    case 'Text': return Text(node, index)
    case 'Link': return <Link {...node} key={index} />
  }
}
export default function renderInlineNodes (nodes: Array<InlineNode>) {
  return nodes.map(createInlineNode)
}