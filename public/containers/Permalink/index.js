/**
 * @flow
 */
import * as React from 'react'

import Stream from '../../components/Stream'
import Entries from '../../api/entries'

import type { Match } from 'react-router-dom'
import type { ResolvedEntry } from '../../types'

const entries = new Entries('entriesArchive')

function loadEntries (entryId?: string): Promise<Array<ResolvedEntry>> {
  if (!entryId) {
    throw new Error(entryId)
  }
  return entries.getEntriesAround(12, entryId)
}

export default function Permalink ({ match }: { match: Match }) {
  const { params } = match

  const props = {}
  if (params.entryId) {
    props.entryId = params.entryId
  }

  return <Stream
    {...props}
    loadEntries={loadEntries}
    prevButton='Mi volt eddig?'
    nextButton='Mi van még?'
  />
}
