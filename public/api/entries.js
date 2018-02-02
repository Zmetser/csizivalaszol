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

/**
 * Return count number of entries starting at startAt or at the first item
 */
export function getEntriesFrom (count: number, startAt?: string): Promise<Array<ResolvedEntry>> {
  const entries = firebaseApp.database().ref('entries').orderByKey()

  const entriesStart = startAt ? entries.startAt(startAt) : entries
  return entriesStart.limitToFirst(count).once('value').then(resolveEntries)
}

/**
 * Return count number of entries until reaching endAt or the last entry
 */
export function getEntriesUntil (count: number, endAt?: string): Promise<Array<ResolvedEntry>> {
  const entries = firebaseApp.database().ref('entries').orderByKey()

  const entriesEnd = endAt ? entries.endAt(endAt) : entries
  return entriesEnd.limitToLast(count).once('value').then(resolveEntries)
}

/**
 * Return count number of entries around the entryId
 * If count is 2 this method returns 3 items:
 * 1 item before entryId, entryId and 1 item after entryId
 */
export function getEntriesAround (count: number, entryId: string): Promise<Array<ResolvedEntry>> {
  const limit = Math.round(count / 2) + 1
  const entries = firebaseApp.database().ref('entries').orderByKey()

  const beforeEntry = entries.endAt(entryId).limitToLast(limit).once('value') // [...entry]
  const afterEntry = entries.startAt(entryId).limitToFirst(limit).once('value') // [entry...]

  return Promise.all([beforeEntry, afterEntry]).then((snapshots) => {
    return Promise.all(snapshots.map(resolveEntries)) // [...entry,entry...]
      // concat items and remove duplicate entry with entryId key
      .then(([beforeEntry, afterEntry]) => beforeEntry.concat(afterEntry.slice(1)))
  })
}

export function getUser (userId: string): Promise<DataSnapshot<User>> {
  return new Promise((resolve, reject) =>
    firebaseApp.database().ref('users').child(userId).once('value', (snapshot) => {
      if (snapshot.val()) {
        resolve(snapshot)
      } else {
        reject(valueNotFoundError(snapshot.ref.toString()))
      }
    }, reject))
}

export function resolveEntries (snapshot: DataSnapshot<Array<EntrySnapshotValue>>): Promise<Array<ResolvedEntry>> {
  const entries = []

  snapshot.forEach((childSnapshot) => {
    const entry: EntrySnapshotValue = childSnapshot.val()
    const entryWithAuthor = getUser(entry.authorId).then((author) => ({
      id: childSnapshot.key,
      author: author.val(),
      publishTime: ({...entry.publishTime, dateISO: getISODate(entry.publishTime.timestamp)}),
      message: entry.message
    }))

    entries.push(entryWithAuthor)
  })

  return Promise.all(entries)
}
