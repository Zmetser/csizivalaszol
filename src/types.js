import type {
  BlockNode
} from './messageBody/types'

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
  id: string,
  author: User,
  publishTime: PublishTime,
  message: Array<BlockNode>
}
