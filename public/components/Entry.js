import * as React from 'react'

import renderMessage from '../../messageBody/renderer/renderMessage'

import type { BlockNode } from '../../messageBody/types'
import type { EntryFull } from '../types'

export default function Entry ({ id, author, publishTime, message }: EntryFull): React.Element<'article'> {
  const date = new Date(publishTime.timestamp)
  const datePublished = date.toLocaleDateString('hu-HU')
  const timePublished = date.toLocaleTimeString('hu-HU')
  return (
    <article className='entry' itemScope itemType='http://schema.org/DiscussionForumPosting'>
      <div className='entry__byline'>
        <p className='entry__username' itemProp='author' itemScope itemType='http://schema.org/Person'>
          <span itemProp='name'>{author.username}</span>
        </p>
        <p className='entry__publishdate'>
          <time itemProp='datePublished' content={publishTime.isoDate} title={`${datePublished} ${timePublished}`}>{datePublished}</time>
        </p>
      </div>
      <div className='entry__message' itemProp='articleBody'>{renderMessage(message)}</div>
    </article>
  )
}
