import * as React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import renderMessage from '../../messageBody/renderer/renderMessage'

import Time from './Time'

import type { BlockNode } from '../../messageBody/types'
import type { EntryFull } from '../types'

const Entry = styled.article`
  margin-bottom: 25px;
  background-color: ${props => props.selected ? '#fafafa' : 'transparent'};

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
    color: #aaa;
    font-size: .8rem;
    text-decoration: none;
    transition: color .25s ease-in-out;
    :hover {
      color: #333;
    }
  }
  .message {
    font-size: 15px;

    & > :last-child {
      margin-bottom: 0;
    }
  }
`

type Props = {
  entry: EntryFull,
  selected?: boolean
}
export default function ({ entry, selected }: Props): React.Element<'article'> {
  const { id, author, publishTime, message } = entry
  const permalink = `/entry/${id}`

  return (
    <Entry selected={selected} itemScope itemType='http://schema.org/DiscussionForumPosting'>
      <div className='byline'>
        <p className='username' itemProp='author' itemScope itemType='http://schema.org/Person'>
          <span itemProp='name'>{author.username}</span>
        </p>
        <Link to={permalink} className='publishdate'>
          <Time publishTime={publishTime} />
        </Link>
      </div>
      <div className='message' itemProp='articleBody'>{renderMessage(message)}</div>
    </Entry>
  )
}
