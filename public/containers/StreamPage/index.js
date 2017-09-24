/**
 * @flow
 */
import last from 'lodash/last'
import React from 'react'

import AppBar from 'material-ui/AppBar'
import CircularProgress from 'material-ui/CircularProgress'

import autobind from 'autobind-decorator'

import Entries from '../../components/Entries'

import { getArchiveEntries, resolveEntries } from '../../api/entries'
import type { EntryFull } from '../../types'

type State = {
  loading: boolean,
  entries: Array<EntryFull>
};

type Props = {
  itemCount: number
};

export default class StreamPage extends React.Component<Props, State> {
  static defaultProps = {
    itemCount: 10
  };

  state = {
    loading: false,
    entries: []
  };

  onLoadMoreClick: () => void;

  componentDidMount () {
    this.setState({ loading: true })
    this.loadEntries().then(entries => {
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
    return (
      <div>
        <AppBar title='Csizi válaszol archívum' showMenuIconButton={false} />
        <Entries entries={entries} />
        {loading && <CircularProgress />}
        <button onClick={this.onLoadMoreClick}>Load more...</button>
      </div>
    )
  }
}
