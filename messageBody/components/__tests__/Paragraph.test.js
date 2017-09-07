/**
 * @flow
 */
import renderer from 'react-test-renderer'

import {
  createTextNode,
  createLink
} from '../../nodes.js'

import Paragraph from '../Paragraph'

const fooText = createTextNode('Foo', [])
const fooLink = createLink([fooText], '#')

describe('<Paragraph />', () => {
  test('with text', () => {
    const element = renderer.create(
      Paragraph({ value: [fooText] }, 0)
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('with text, link and text', () => {
    const element = renderer.create(
      Paragraph({ value: [fooText, fooLink, fooText] }, 0)
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
      Paragraph({ value }, 0)
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
