/**
 * @flow
 */

import * as React from 'react'
import renderer from 'react-test-renderer'

import { UnknownNodeError } from '../../errors'
import renderMessage from '../renderMessage'

import { createParagraph, createTextNode } from '../../nodes'

describe('Render a single message', () => {
  test('with an unknown element, should throw UnknownNodeError', () => {
    // $FlowSkipForTesting: Testing what happens when a node is not supported.
    const unknownNode = [{'type': 'Foo'}]
    expect(() => renderMessage(unknownNode)).toThrowError(UnknownNodeError)
  })

  test('with a single paragraph', () => {
    const p1 = createParagraph([createTextNode('foo', [])])
    const element = renderer.create(
      <article>{renderMessage([p1])}</article>
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('with multiple paragraphs', () => {
    const p1 = createParagraph([createTextNode('foo', [])])
    const p2 = createParagraph([createTextNode('bar', [])])
    const element = renderer.create(
      <article>{renderMessage([p1, p2])}</article>
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
