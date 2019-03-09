import type { BlockNode } from './messageBody/types'
import type { EntryId } from './models/EntryId'
import type User from './models/User'

export type EntrySnapshotValue = {
  authorId: string,
  publishTime: {
    timestamp: number,
    timezone: string
  },
  message: Array<BlockNode>,
  archived?: boolean,
  replyTo?: string,
  replies?: Array<string>
}

export type PublishTime = {
  timestamp: number,
  dateISO: string,
  timezone: string
}

export type ResolvedEntry = {
  id: EntryId,
  author: User,
  publishTime: PublishTime,
  message: Array<BlockNode>
}
