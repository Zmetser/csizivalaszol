/**
 * @flow
 * 
 * Create an anchor tag frm the Link structure
 */

import * as React from 'react'
import type { LinkNode } from '../types'
import Text from './Text'

export default function Link ({ value, href, target }: $Shape<LinkNode>): React.Element<'a'> {
  const props = Object.assign({}, target ? { target } : null)
  return <a href={href} {...props}>{value.map(Text)}</a>
}
