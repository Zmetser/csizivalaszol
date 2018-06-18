/**
 * @flow
 */
import * as React from 'react'

import Stream from '../../components/Stream'
import Entries from '../../api/entries'
import { toEntryId } from '../../models/EntryId'

import type { Match } from 'react-router-dom'
import type { ResolvedEntry } from '../../types'
import type { EntryId } from '../../models/EntryId'

const entries = new Entries('entriesArchive')

function loadEntries (entryId?: EntryId): Promise<Array<ResolvedEntry>> {
  if (!entryId) {
    throw new Error(entryId)
  }
  return entries.getEntriesAround(12, entryId)
}

function loadMore (entryId: EntryId): Promise<Array<ResolvedEntry>> {
  return entries.getEntriesFrom(10, entryId)
}

function loadPrev (entryId: EntryId): Promise<Array<ResolvedEntry>> {
  return entries.getEntriesUntil(10, entryId)
}

export default function Permalink ({ match }: { match: Match }) {
  const { params } = match

  const props = {}
  if (params.entryId) {
    props.entryId = toEntryId(params.entryId)
  }

  return <Stream
    {...props}
    loadEntries={loadEntries}
    loadMore={loadMore}
    loadPrev={loadPrev}
    prevButton='Mi volt eddig?'
    nextButton='Mi van még?'
  />
}
