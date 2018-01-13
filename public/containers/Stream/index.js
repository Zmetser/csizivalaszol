/**
 * @flow
 */
import last from 'lodash/last'
import * as React from 'react'

import autobind from 'autobind-decorator'

import Entry from '../../components/Entry'

import { getArchiveEntries, resolveEntries } from '../../api/entries'
import type { EntryFull } from '../../types'

type State = {
  loading: boolean,
  entries: Array<EntryFull>
};

type Props = {
  itemCount: number,
  startAt?: string
};

export default class StreamPage extends React.Component<Props, State> {
  static defaultProps = {
    itemCount: 200
  };

  state = {
    loading: false,
    entries: []
  };

  onLoadMoreClick: () => void;

  componentDidUpdate (prevProps: Props) {
    if (prevProps.startAt !== this.props.startAt) {
      this.loadEntries(this.props.startAt).then(entries => {
        this.setState({ entries, loading: false })
      })
    }
  }

  componentDidMount () {
    this.setState({ loading: true })
    this.loadEntries(this.props.startAt).then(entries => {
      this.setState({ entries, loading: false })
    })
  }

  loadEntries (startAt?: string) {
    return getArchiveEntries(this.props.itemCount, startAt).then(resolveEntries)
  }

  @autobind
  onLoadMoreClick () {
    const { entries } = this.state
    const startAt = last(entries).id

    this.setState({ loading: true })
    this.loadEntries(startAt).then(newEntries => {
      const allEntries = entries.concat(newEntries.slice(1))
      this.setState({
        entries: allEntries,
        loading: false
      })
    })
  }

  render () {
    const { entries, loading } = this.state
    const { startAt } = this.props
    // TODO: Loading state
    return (
      <React.Fragment>
        <section>
          {entries.map((entry: EntryFull) =>
            <Entry key={entry.id} entry={entry} selected={entry.id === startAt} />)}
        </section>
        <button onClick={this.onLoadMoreClick}>Load more...</button>
      </React.Fragment>
    )
  }
}
