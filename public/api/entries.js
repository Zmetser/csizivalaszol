/**
 * @flow
 */

import firebaseApp from '../firebaseApp'

import { flatMap } from 'lodash'

import type { EntrySnapshotValue, ResolvedEntry, User } from '../types'

function getISODate (timestamp) {
  return (new Date(timestamp)).toISOString().split('T')[0]
}

function valueNotFoundError (URL) {
  return {
    code: 'app/object_not_found',
    message: 'resource not found at: ' + URL
  }
}

type Path = 'entries' | 'entriesArchive'

export default class Entries {
  ref: Query

  constructor (path: Path) {
    this.ref = firebaseApp.database().ref(path).orderByKey()
  }

  /**
   * Return count number of entries starting at startAt or at the first item
   */
  getEntriesFrom (count: number, startAt?: string): Promise<Array<ResolvedEntry>> {
    const entries = startAt ? this.ref.startAt(startAt) : this.ref
    return entries.limitToFirst(count).once('value').then(resolveEntries)
  }

  /**
   * Return count number of entries until reaching endAt or the last entry
   */
  getEntriesUntil (count: number, endAt?: string): Promise<Array<ResolvedEntry>> {
    const entries = endAt ? this.ref.endAt(endAt) : this.ref
    return entries.limitToLast(count).once('value').then(resolveEntries)
  }

  /**
   * Return count number of entries around the entryId
   * If count is 2 this method returns 3 items:
   * 1 item before entryId, entryId and 1 item after entryId
   */
  getEntriesAround (count: number, entryId: string): Promise<Array<ResolvedEntry>> {
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

function getUser (userId: string): Promise<DataSnapshot<User>> {
  return new Promise((resolve, reject) =>
    firebaseApp.database().ref('users').child(userId).once('value', (snapshot) => {
      if (snapshot.val()) {
        resolve(snapshot)
      } else {
        reject(valueNotFoundError(snapshot.ref.toString()))
      }
    }, reject))
}

function resolveEntry (dataSnapshot: DataSnapshot<EntrySnapshotValue>): Promise<ResolvedEntry> {
  const entry: EntrySnapshotValue = dataSnapshot.val()
  const entryWithAuthor = getUser(entry.authorId).then((author) => ({
    id: dataSnapshot.key,
    author: author.val(),
    publishTime: ({ ...entry.publishTime, dateISO: getISODate(entry.publishTime.timestamp) }),
    message: entry.message
  }))

  return entryWithAuthor
}

function resolveEntries (snapshot: DataSnapshot<Array<EntrySnapshotValue>>): Promise<Array<ResolvedEntry>> {
  const entries = []

  snapshot.forEach((childSnapshot) => {
    entries.push(resolveEntry(childSnapshot))
  })

  return Promise.all(entries)
}
