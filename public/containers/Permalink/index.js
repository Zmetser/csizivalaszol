/**
 * @flow
 */
import * as React from 'react'

import Stream from '../../components/Stream'
import { getEntriesAround } from '../../api/entries'
import type { ResolvedEntry } from '../../types'

function loadEntries (entryId?: string): Promise<Array<ResolvedEntry>> {
  if (!entryId) {
    throw new Error(entryId)
  }
  return getEntriesAround(12, entryId)
}

export default ({ match }) => {
  const { params } = match
  return <Stream
    entryId={params.entryId}
    loadEntries={loadEntries}
    prevButton='Mi volt eddig?'
    nextButton='Mi van még?'
  />
}
