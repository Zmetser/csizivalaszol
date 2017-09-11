/**
 * @flow
 */

import * as React from 'react'
import {
  Paragraph,
  UnorderedList,
  OrderedList
} from '../components'

import type { BlockNode } from '../types.js'
import { UnknownNodeError } from '../errors'

export default function render (message: Array<BlockNode>): Array<React.Element<'p' | 'ul' | 'ol'>> {
  return message.map((node, index): React.Element<*> => {
    switch (node.type) {
      case 'Paragraph': return Paragraph({ value: node.value }, index)
      case 'List':
        return (node.listType === 'Bullet')
          ? UnorderedList({ items: node.items }, index)
          : OrderedList({ items: node.items }, index)
      default: throw new UnknownNodeError(node)
    }
  })
}
