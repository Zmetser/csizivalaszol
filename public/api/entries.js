/**
 * @flow
 */

import firebaseApp from '../firebaseApp'

import type { EntrySnapshotValue, EntryType, User } from '../types'

function getISODate (timestamp) {
  return (new Date(timestamp)).toISOString().split('T')[0]
}

function valueNotFoundError (URL) {
  return {
    code: 'app/object_not_found',
    message: 'resource not found at: ' + URL
  }
}

export function getArchiveEntries (count: number, startAt?: string): Promise<DataSnapshot<Array<EntrySnapshotValue>>> {
  const entries = firebaseApp.database().ref('entries')

  return new Promise((resolve, reject) =>
    entries.limitToFirst(count).once('value', resolve, reject))
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

export function resolveEntries (snapshot: DataSnapshot<Array<EntrySnapshotValue>>): Promise<Array<EntryType>> {
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
