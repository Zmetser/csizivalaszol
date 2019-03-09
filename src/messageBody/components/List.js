import * as React from 'react'
import type { ListNode, ListTypes } from '../types'

import { UnknownNodeError } from '../errors'

import renderInlineNodes from '../renderer/renderInlineNodes'

const renderListItem = (value, index) => (
  <li key={index}>{renderInlineNodes(value)}</li>
)

export function UnorderedList ({ node }: { node: ListNode<'Bullet'> }): React.Element<'ul'> {
  const { items } = node
  return <ul>{items.map(renderListItem)}</ul>
}

export function OrderedList ({ node }: { node: ListNode<'Number'> }): React.Element<'ol'> {
  const { items } = node
  return <ol>{items.map(renderListItem)}</ol>
}

export default function List ({ node }: { node: ListTypes }): React.Element<typeof UnorderedList> | React.Element<typeof OrderedList> {
  switch (node.listType) {
    case 'Number': return <OrderedList node={node} />
    case 'Bullet': return <UnorderedList node={node} />
    default: {
      throw new UnknownNodeError(node)
    }
  }
}
