/**
 * @flow
 * 
 * Create an anchor tag frm the Link structure
 */

import React from 'react'

import type { LinkNode } from '../types'

import Text from './Text'

type Props = LinkNode
export default function Link ({ value, href, target }: Props): React$Node<*> {
  const props = Object.assign({}, target ? { target } : null)
  return <a href={href} {...props}>{value.map(Text)}</a>
}
