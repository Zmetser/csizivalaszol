import * as React from 'react'

import Stream from '../../components/Stream'
import Entries from '../../api/entries'

import type { ResolvedEntry } from '../../types'
import type { EntryId } from '../../models/EntryId'

const entries = new Entries('entriesArchive')

function loadEntries (entryId?: EntryId): Promise<Array<ResolvedEntry>> {
  return entries.getEntriesFrom(10, entryId)
}

function loadMore (entryId: EntryId): Promise<Array<ResolvedEntry>> {
  return entries.getEntriesFrom(25, entryId)
}

export default function Archive () {
  return <Stream
    loadEntries={loadEntries}
    loadMore={loadMore}
    nextButton='Nem elég Csiziből'
  />
}
