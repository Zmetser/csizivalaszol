/**
 * @flow
 */

import * as React from 'react'
import type { ListNode } from '../types'

import renderInlineNodes from '../renderer/renderInlineNodes'

const renderListItem = (value, index) => (
  <li key={index}>{renderInlineNodes(value)}</li>
)

export function UnorderedList ({ items }: $Shape<ListNode<'Bullet'>>, key: React.Key): React.Element<'ul'> {
  return <ul key={key}>{items.map((value, index) => renderListItem(value, index))}</ul>
}

export function OrderedList ({ items }: $Shape<ListNode<'Number'>>, key: React.Key): React.Element<'ol'> {
  return <ol key={key}>{items.map((value, index) => renderListItem(value, index))}</ol>
}
