/**
 * @flow
 */
import renderer from 'react-test-renderer'

import Link from '../Link'

import { createTextNode } from '../../nodes.js'

const fooText = createTextNode('Foo', [])
const fooTextItalic = createTextNode('Foo', ['Italic'])

describe('<a />', () => {
  test('link', () => {
    const element = renderer.create(
      Link({ value: [fooText], href: '#' })
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('link with "_blank" target', () => {
    const element = renderer.create(
      Link({ value: [fooText], href: '#', target: '_blank' })
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('link with styled content', () => {
    const element = renderer.create(
      Link({ value: [fooTextItalic], href: '#', target: '_blank' })
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('link with a list of values', () => {
    const element = renderer.create(
      Link({ value: [fooTextItalic, fooTextItalic, fooTextItalic], href: '#', target: '_blank' })
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
