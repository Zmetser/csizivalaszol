import type {
  BlockNode
} from '../messageBody/types'

export type EntrySnapshotValue = {
  authorId: string,
  publishTime: {
    timestamp: number,
    timezone: string
  },
  message: Array<BlockNode>
}

export type User = {
  username: string,
  firstName: string,
  lastName: string
}

export type PublishTime = {
  timestamp: number,
  dateISO: string,
  timezone: string
}

export type EntryType = {
  id: string,
  author: User,
  publishTime: PublishTime,
  message: Array<BlockNode>
}
