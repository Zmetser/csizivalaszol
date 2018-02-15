/**
 * @flow
 */
import { last } from 'lodash'
import * as React from 'react'

import autobind from 'autobind-decorator'

import Entry from '../components/Entry'

import type { ResolvedEntry, EntrySnapshotValue } from '../types'
import type { EntryId } from '../models/EntryId'

type State = {
  loading: boolean,
  entries: Array<ResolvedEntry>,
  currentEntryId?: EntryId
}

type Props = {
  entryId?: EntryId,
  loadEntries: (entryId?: EntryId) => Promise<Array<ResolvedEntry>>,
  loadMore?: (entryId: EntryId) => Promise<Array<ResolvedEntry>>,
  loadPrev?: (entryId: EntryId) => Promise<Array<ResolvedEntry>>,
  prevButton?: string,
  nextButton?: string
}

export default class Stream extends React.Component<Props, State> {
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

  loadEntries (startingFromId?: EntryId) {
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

    if (this.props.loadMore) {
      this.props.loadMore(id)
        .then(entries => this.setState({ entries: this.state.entries.concat(entries.slice(1)) }))
    }
  }

  @autobind
  onLoadPrevClick () {
    const { id } = this.state.entries[0]

    if (this.props.loadPrev) {
      this.props.loadPrev(id)
        .then(entries => this.setState({ entries: entries.concat(this.state.entries.slice(1)) }))
    }
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
