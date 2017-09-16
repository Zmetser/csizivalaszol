/**
 * @flow
 */
import last from 'lodash/last'
import React from 'react'
import AppBar from 'material-ui/AppBar'

import Entries from '../../components/Entries'

import { getArchiveEntries, resolveEntries } from '../../api/entries'
import type { EntryFull } from '../../types'

type State = {
  entries: Array<EntryFull>
};

export default class StreamPage extends React.Component<void, State> {
  state = {
    entries: []
  };

  componentDidMount () {
    this.loadEntries()
  }

  loadEntries () {
    const { entries } = this.state
    const startAt = entries.length ? last(entries).id : null

    getArchiveEntries(10, startAt)
      .then(resolveEntries)
      .then(entries => {
        this.setState({ entries })
      })
  }

  render () {
    const { entries } = this.state
    return (
      <div>
        <AppBar title='Csizi válaszol archívum' showMenuIconButton={false} />
        <Entries entries={entries} />
      </div>
    )
  }
}
