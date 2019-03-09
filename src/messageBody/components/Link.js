/**
 * Create an anchor tag frm the Link structure
 */

import * as React from 'react'
import type { LinkNode } from '../types'
import Text from './Text'


type Props = { node: LinkNode }
export default function Link ({ node }: Props): React.Element<'a'> {
  const { value, href, target } = node
  const props = Object.assign({}, target ? { target } : null)
  return <a href={href} {...props}>{value.map((node, index) => <Text node={node} key={index} />)}</a>
}
