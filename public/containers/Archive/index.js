/**
 * @flow
 */
import * as React from 'react'

import Stream from '../../components/Stream'
import Entries from '../../api/entries'
import type { ResolvedEntry } from '../../types'

const entries = new Entries('entriesArchive')

function loadEntries (entryId?: string): Promise<Array<ResolvedEntry>> {
  return entries.getEntriesFrom(10, entryId)
}

function loadPrev (entryId: string): Promise<Array<ResolvedEntry>> {
  return entries.getEntriesUntil(10, entryId)
}

export default function Archive () {
  return <Stream
    loadEntries={loadEntries}
    loadMore={loadEntries}
    loadPrev={loadPrev}
    nextButton='Nem elég Csiziből'
  />
}
