import * as React from 'react'
import styled from 'styled-components'

import renderMessage from '../../messageBody/renderer/renderMessage'

import Time from './Time'

import type { BlockNode } from '../../messageBody/types'
import type { EntryFull } from '../types'

const Entry = styled.article`
  margin-bottom: 25px;

  &:after {
    content: '';
    display: block;
    background-color: #e5e5e5;
    height: 1px;
    margin-top: 20px;
  }

  .byline {}
  .username {
    font-weight: bold;
    margin: 0;
  }
  .publishdate {
    font-size: .8rem;
  }
  .message {
    font-size: 15px;

    & > :last-child {
      margin-bottom: 0;
    }
  }
`

export default function ({ id, author, publishTime, message }: EntryFull): React.Element<'article'> {
  return (
    <Entry itemScope itemType='http://schema.org/DiscussionForumPosting'>
      <div className='byline'>
        <p className='username' itemProp='author' itemScope itemType='http://schema.org/Person'>
          <span itemProp='name'>{author.username}</span>
        </p>
        <Time publishTime={publishTime} className='publishdate' />
      </div>
      <div className='message' itemProp='articleBody'>{renderMessage(message)}</div>
    </Entry>
  )
}
