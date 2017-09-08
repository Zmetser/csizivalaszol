/**
 * @flow
 */

import * as React from 'react'
import { Paragraph } from '../components'

import type { BlockNode } from '../types.js'
import { UnknownNodeError } from '../errors'

export default function render (message: Array<BlockNode>): Array<React.Element<*>> {
  return message.map((node, index): React.Element<*> => {
    switch (node.type) {
      case 'Paragraph': return Paragraph({ value: node.value }, index)
      default: throw new UnknownNodeError(node)
    }
  })
}
