import type { BlockNode } from './types'

export class UnknownNodeError extends Error {
  constructor (node: BlockNode) {
    super(node.type)
  }
}
UnknownNodeError.prototype.name = 'UnknownNodeError'
