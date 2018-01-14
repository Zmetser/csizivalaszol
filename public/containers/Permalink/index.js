// import * as React from 'react'

// import Stream from '../Stream'

/**
 * @flow
 */
import last from 'lodash/last'
import * as React from 'react'

import autobind from 'autobind-decorator'

import Entry from '../../components/Entry'

import { getEntriesAround } from '../../api/entries'
import type { EntryFull } from '../../types'

type State = {
  loading: boolean,
  entries: Array<EntryFull>
};

type Props = {
  itemCount: number,
  startAt: string
};

class Stream extends React.Component<Props, State> {
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

  loadEntries (startAt: string) {
    return getEntriesAround(startAt, 6)
  }

  render () {
    const { entries } = this.state
    const { startAt } = this.props
    // TODO: Loading state
    return (
      <React.Fragment>
        <section>
          {entries.map((entry: EntryFull) =>
            <Entry key={entry.id} entry={entry} selected={entry.id === startAt} />)}
        </section>
      </React.Fragment>
    )
  }
}

export default ({ match }) => {
  const { params } = match
  return <Stream startAt={params.entryId} itemCount={10} />
}
