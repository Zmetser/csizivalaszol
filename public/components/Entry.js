import * as React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import Title from 'grommet/components/Title'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'

import renderMessage from '../../messageBody/renderer/renderMessage'

import Time from './Time'

import type { BlockNode } from '../../messageBody/types'
import type { EntryFull } from '../types'

const StyledEntry = styled(Article)`
  margin-bottom: 25px;
  background-color: ${props => props.selected ? '#fafafa' : 'transparent'};

  &:after {
    content: '';
    display: block;
    background-color: #e5e5e5;
    height: 1px;
    margin-top: 20px;
  }

  .username {
    font-weight: bold;
    margin: 0;
  }
  .debug {
    color: #aaa;
    font-size: .8rem;
    font-family: monospace;
    font-weight: normal;
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
    <StyledEntry itemScope itemType='http://schema.org/DiscussionForumPosting'>
      <Title className='username' itemProp='author' itemScope itemType='http://schema.org/Person'>
        <span itemProp='name'>{author.displayName}</span>
        <span className='debug' itemProp='otherName'>{id}</span>
      </Title>
      <Link to={permalink} className='publishdate'>
        <Time publishTime={publishTime} />
      </Link>
      <Section className='message' itemProp='articleBody'>
        {renderMessage(message)}
      </Section>
    </StyledEntry>
  )
}
