import * as React from 'react'
import type { PublishTime } from '../types'
type Props = {
  publishTime: PublishTime
}

export default ({ publishTime, ...props }: Props) => {
  const date = new Date(publishTime.timestamp)
  const datePublished = date.toLocaleDateString('hu-HU')
  const timePublished = date.toLocaleTimeString('hu-HU')

  return <time
    itemProp='datePublished'
    content={publishTime.dateISO}
    title={`${datePublished}
    ${timePublished}`}
    {...props}
  >
    {datePublished}
  </time>
}
