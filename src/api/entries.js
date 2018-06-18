/**
 * @flow
 */

import firebaseApp from '../firebaseApp'

import flatMap from 'lodash/flatMap'

import Entry from '../models/Entry'
import User from '../models/User'
import { toUserId } from '../models/UserId'

import type { EntrySnapshotValue, ResolvedEntry } from '../types'
import type { UserId } from '../models/UserId'
import type { EntryId } from '../models/EntryId'

function valueNotFoundError (URL) {
  return {
    code: 'app/object_not_found',
    message: 'resource not found at: ' + URL
  }
}

type Path = 'entries' | 'entriesArchive'

export default class Entries {
  ref: $npm$firebase$database$Query

  constructor (path: Path) {
    this.ref = firebaseApp.database().ref(path).orderByKey()
  }

  /**
   * Return count number of entries starting at startAt or at the first item
   */
  getEntriesFrom (count: number, startAt?: EntryId): Promise<Array<ResolvedEntry>> {
    const entries = startAt ? this.ref.startAt(startAt) : this.ref
    return entries.limitToFirst(count).once('value').then(resolveEntries)
  }

  /**
   * Return count number of entries until reaching endAt or the last entry
   */
  getEntriesUntil (count: number, endAt?: EntryId): Promise<Array<ResolvedEntry>> {
    const entries = endAt ? this.ref.endAt(endAt) : this.ref
    return entries.limitToLast(count).once('value').then(resolveEntries)
  }

  /**
   * Return count number of entries around the entryId
   * If count is 2 this method returns 3 items:
   * 1 item before entryId, entryId and 1 item after entryId
   */
  getEntriesAround (count: number, entryId: EntryId): Promise<Array<ResolvedEntry>> {
    const limit = Math.round(count / 2) + 1

    const beforeEntry = this.ref.endAt(entryId).limitToLast(limit).once('value') // [...entry]
    const afterEntry = this.ref.startAt(entryId).limitToFirst(limit).once('value') // [entry...]

    return Promise.all([beforeEntry, afterEntry]).then((snapshots) => {
      return Promise.all(snapshots.map(resolveEntries)) // [...entry,entry...]
        // concat items and remove duplicate entry with entryId key
        .then(([beforeEntry, afterEntry]) => beforeEntry.concat(afterEntry.slice(1)))
    })
  }
}

function getUser (id: UserId): Promise<User> {
  return new Promise((resolve, reject) =>
    firebaseApp.database().ref('users').child(id).once('value', (snapshot) => {
      const user = snapshot.val()
      if (user) {
        resolve(new User({ id, ...user }))
      } else {
        reject(valueNotFoundError(snapshot.ref.toString()))
      }
    }, reject))
}

function resolveEntry (dataSnapshot: $npm$firebase$database$DataSnapshot): Promise<ResolvedEntry> {
  const id = dataSnapshot.key

  if (!id) {
    throw new Error('snapshot has no key')
  }

  const entry = dataSnapshot.val()
  const entryWithAuthor = getUser(toUserId(entry.authorId)).then((author: User) => {
    const { authorId, ...entryWithoutAuthorId } = entry
    return new Entry({ id, author, ...entryWithoutAuthorId })
  })

  return entryWithAuthor
}

function resolveEntries (snapshot: $npm$firebase$database$DataSnapshot): Promise<Array<ResolvedEntry>> {
  const entries = []

  snapshot.forEach((childSnapshot) => {
    entries.push(resolveEntry(childSnapshot))
    return false
  })

  return Promise.all(entries)
}
