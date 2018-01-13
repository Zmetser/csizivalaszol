import * as React from 'react'
import styled from 'styled-components'

const Time = styled.time`
  color: #aaa
`

export default ({ publishTime, ...props }) => {
  const date = new Date(publishTime.timestamp)
  const datePublished = date.toLocaleDateString('hu-HU')
  const timePublished = date.toLocaleTimeString('hu-HU')

  return <Time
    itemProp='datePublished'
    content={publishTime.isoDate}
    title={`${datePublished}
    ${timePublished}`}
    {...props}>{datePublished}</Time>
}
