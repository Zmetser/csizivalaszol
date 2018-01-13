/**
 * @flow
 */
import * as React from 'react'

import Stream from '../../components/Stream'
import { getEntriesFrom } from '../../api/entries'
import type { ResolvedEntry } from '../../types'

function loadEntries (entryId?: string): Promise<Array<ResolvedEntry>> {
  return getEntriesFrom(10, entryId)
}

export default () => (
  <Stream
    loadEntries={loadEntries}
    nextButton='Nem elég Csiziből'
  />
)
