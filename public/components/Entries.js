import * as React from 'react'

import Entry from './Entry'

import type { EntryFull } from '../types'

type Props = {
  entries: Array<EntryFull>
}

export default function Entries ({ entries }: Props) {
  return <section>
    {entries.map((entry) => <Entry key={entry.id} {...entry} />)}
  </section>
}
