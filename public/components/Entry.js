import * as React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import renderMessage from '../../messageBody/renderer/renderMessage'

import Time from './Time'

import type { BlockNode } from '../../messageBody/types'
import type { EntryFull } from '../types'

const StyledEntry = styled.article`
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
    font-size: 1.5rem;
    line-height: 1;
  }
  .debug {
    color: #aaa;
    font-size: .8rem;
    font-family: monospace;
    font-weight: normal;
    display: none;
  }
  .publishdate {
    color: #aaa;
    font-size: .8rem;
    text-decoration: none;
    transition: color .25s ease-in-out;
    line-height: 1;
    :hover {
      color: #333;
    }
  }
  .message {
    font-size: ${props => props.selected ? '1rem' : '.9rem'};
    font-family: 'Raleway', sans-serif;

    p {
      margin: 1.5rem 0;
    }

    & > :last-child {
      margin-bottom: 0;
    }
  }
`

StyledEntry.displayName = 'StyledEntry'

type Props = {
  entry: EntryFull,
  selected?: boolean
}
export default function Entry ({ entry, selected }: Props): React.Element<'article'> {
  const { id, author, publishTime, message } = entry
  const permalink = `/entry/${id}`

  return (
    <StyledEntry selected={selected} itemScope itemType='http://schema.org/DiscussionForumPosting'>
      <div className='byline'>
        <p className='username' itemProp='author' itemScope itemType='http://schema.org/Person'>
          <span itemProp='name'>{author.displayName}</span>
          <span className='debug' itemProp='otherName'>{id}</span>
        </p>
        <Link to={permalink} className='publishdate'>
          <Time publishTime={publishTime} />
        </Link>
      </div>
      <div className='message' itemProp='articleBody'>{renderMessage(message)}</div>
    </StyledEntry>
  )
}
