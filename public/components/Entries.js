import * as React from 'react'

import Entry from './Entry'

import { getArchiveEntries, resolveEntries } from '../api/entries'
import type { EntryFull } from '../types'

type State = {
  entries: Array<EntryFull>
}

export default class Entries extends React.Component<void, State> {
  state = {
    entries: []
  }

  componentDidMount () {
    getArchiveEntries(100)
      .then(resolveEntries)
      .then((entries) => {
        this.setState({ entries })
      })
  }

  render () {
    const { entries } = this.state
    return <section>
      {entries.map((entry) => <Entry key={entry.id} {...entry} />)}
    </section>
  }
}
