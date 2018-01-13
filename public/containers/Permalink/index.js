import * as React from 'react'

import Stream from '../Stream'

export default ({ match }) => {
  const { params } = match
  return <Stream startAt={params.entryId} itemCount={10} />
}
