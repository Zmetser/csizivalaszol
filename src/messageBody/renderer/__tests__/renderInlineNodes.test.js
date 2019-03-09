import * as React from 'react'
import renderer from 'react-test-renderer'

import { UnknownNodeError } from '../../errors'
import renderInlineNodes from '../renderInlineNodes'

import { createTextNode, createLink, createLineBreak } from '../../nodes'

const text = createTextNode('foo', [])
const link = createLink([createTextNode('foo', [])], '#')
const lineBreak = createLineBreak()

describe('Render inline nodes', () => {
  test('with an unknown element, should throw UnknownNodeError', () => {
    // $FlowSkipForTesting: Testing what happens when a node is not supported.
    const unknownNode = [{'type': 'Foo'}]
    expect(() => renderInlineNodes(unknownNode)).toThrowError(UnknownNodeError)
  })

  test('with a single text node', () => {
    const element = renderer.create(
      <p>{renderInlineNodes([text])}</p>
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('with a single link', () => {
    const element = renderer.create(
      <p>{renderInlineNodes([link])}</p>
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('with everything', () => {
    const element = renderer.create(
      <p>{renderInlineNodes([text, lineBreak, link])}</p>
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
