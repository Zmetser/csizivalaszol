/**
 * @flow
 */
import * as React from 'react'
import renderer from 'react-test-renderer'

import {
  createParagraph,
  createTextNode,
  createLink
} from '../../nodes.js'

import Paragraph from '../Paragraph'

const fooText = createTextNode('Foo', [])
const fooLink = createLink([fooText], '#')

describe('<Paragraph />', () => {
  test('with text', () => {
    const element = renderer.create(
      <Paragraph node={createParagraph([fooText])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('with text, link and text', () => {
    const element = renderer.create(
      <Paragraph node={createParagraph([fooText, fooLink, fooText])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('with styled text', () => {
    const value = [
      createTextNode('Bold', ['Bold']),
      createTextNode('Italic', ['Italic']),
      createTextNode('Small and Code', ['Small', 'Code'])
    ]
    const element = renderer.create(
      <Paragraph node={createParagraph(value)} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
