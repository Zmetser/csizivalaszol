/**
 * @flow
 */
import last from 'lodash/last'
import React from 'react'
import AppBar from 'material-ui/AppBar'

import autobind from 'autobind-decorator'

import Entries from '../../components/Entries'

import { getArchiveEntries, resolveEntries } from '../../api/entries'
import type { EntryFull } from '../../types'

type State = {
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
    entries: []
  };

  onLoadMoreClick: () => void;

  componentDidMount () {
    this.loadEntries().then(entries => {
      this.setState({ entries })
    })
  }

  loadEntries (startAt?: string) {
    return getArchiveEntries(this.props.itemCount, startAt).then(resolveEntries)
  }

  @autobind
  onLoadMoreClick () {
    const { entries } = this.state
    const startAt = last(entries).id

    this.loadEntries(startAt).then(newEntries => {
      this.setState({ entries: entries.concat(newEntries.slice(1)) })
    })
  }

  render () {
    const { entries } = this.state
    return (
      <div>
        <AppBar title='Csizi válaszol archívum' showMenuIconButton={false} />
        <Entries entries={entries} />
        <button onClick={this.onLoadMoreClick}>Load more...</button>
      </div>
    )
  }
}
