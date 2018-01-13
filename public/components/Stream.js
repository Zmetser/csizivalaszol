/**
 * @flow
 */
import last from 'lodash/last'
import * as React from 'react'

import autobind from 'autobind-decorator'

import { getEntriesFrom, getEntriesUntil } from '../api/entries'

import Entry from '../components/Entry'

import type { ResolvedEntry, EntrySnapshotValue } from '../types'

type State = {
  loading: boolean,
  entries: Array<ResolvedEntry>,
  currentEntryId?: string
}

type Props = {
  entryId?: string,
  loadEntries: (entryId?: string) => Promise<Array<ResolvedEntry>>,
  prevButton?: string,
  nextButton?: string
}

export default class StreamPage extends React.Component<Props, State> {
  static defaultProps = {
    itemCount: 200
  }

  state = {
    loading: false,
    entries: [],
    currentEntryId: this.props.entryId
  }

  componentWillReceiveProps ({ entryId }: Props) {
    if (entryId !== this.state.currentEntryId) {
      this.loadEntries(entryId)
        .then(entries => this.setState({ entries, currentEntryId: entryId }))
    }
  }

  loadEntries (startingFromId?: string) {
    this.setState({ loading: true })
    return this.props.loadEntries(startingFromId).then(entries => {
      this.setState({ loading: false })
      return entries
    })
  }

  componentDidMount () {
    this.loadEntries(this.state.currentEntryId)
      .then(entries => this.setState({ entries }))
  }

  @autobind
  onLoadMoreClick () {
    const { id } = last(this.state.entries)
    getEntriesFrom(10, id)
      .then(entries => this.setState({ entries: this.state.entries.concat(entries.slice(1)) }))
  }

  @autobind
  onLoadPrevClick () {
    const { id } = this.state.entries[0]
    getEntriesUntil(10, id)
      .then(entries => this.setState({ entries: entries.concat(this.state.entries.slice(1)) }))
  }

  render () {
    const { entries, loading, currentEntryId } = this.state
    // TODO: Loading state
    return (
      <React.Fragment>
        {this.props.prevButton ? <button onClick={this.onLoadPrevClick}>{this.props.prevButton}</button> : null}
        <section>
          {entries.map((entry: ResolvedEntry) =>
            <Entry key={entry.id} entry={entry} selected={entry.id === currentEntryId} />)}
        </section>
        {this.props.nextButton ? <button onClick={this.onLoadMoreClick}>{this.props.nextButton}</button> : null}
      </React.Fragment>
    )
  }
}
