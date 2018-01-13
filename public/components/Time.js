import * as React from 'react'

export default ({ publishTime, ...props }) => {
  const date = new Date(publishTime.timestamp)
  const datePublished = date.toLocaleDateString('hu-HU')
  const timePublished = date.toLocaleTimeString('hu-HU')

  return <time
    itemProp='datePublished'
    content={publishTime.isoDate}
    title={`${datePublished}
    ${timePublished}`}
    {...props}
  >
    {datePublished}
  </time>
}
