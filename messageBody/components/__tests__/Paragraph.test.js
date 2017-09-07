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
      Paragraph({ value: [fooText] })
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('with text, link and text', () => {
    const element = renderer.create(
      Paragraph({ value: [fooText, fooLink, fooText] })
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('with styled text', () => {
    const element = renderer.create(
      Paragraph({ value: [
        createTextNode('Bold', ['Bold']),
        createTextNode('Italic', ['Italic']),
        createTextNode('Small and Code', ['Small', 'Code'])
      ] })
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
