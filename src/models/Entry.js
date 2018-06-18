/**
 * @flow
 */
import type { BlockNode } from '../messageBody/types'
import type { PublishTime } from '../types'
import type { EntryId } from './EntryId'
import { toEntryId } from './EntryId'
import User from './User'

export type EntryJSON = {
  id: string,
  author: User,
  publishTime: PublishTime,
  message: Array<BlockNode>,
  archived?: boolean,
  replyTo?: string,
  replies?: Array<string>
}

function getISODate (timestamp) {
  return (new Date(timestamp)).toISOString().split('T')[0]
}

export default class Entry {
  id: EntryId
  author: User
  publishTime: PublishTime
  message: Array<BlockNode>
  archived: boolean
  replyTo: ?EntryId
  replies: Array<EntryId>

  constructor (entry: EntryJSON) {
    this.id = toEntryId(entry.id)
    this.author = entry.author
    this.publishTime = {
      ...entry.publishTime,
      dateISO: getISODate(entry.publishTime.timestamp)
    }
    this.message = entry.message
    this.archived = entry.archived || false
    this.replyTo = entry.replyTo ? toEntryId(entry.replyTo) : null
    this.replies = []
  }
}
