import * as React from 'react'
import renderer from 'react-test-renderer'

import Link from '../Link'

import {
  createTextNode,
  createLink
} from '../../nodes.js'

const fooText = createTextNode('Foo', [])
const fooTextItalic = createTextNode('Foo', ['Italic'])

describe('<a />', () => {
  test('link', () => {
    const element = renderer.create(
      <Link node={createLink([fooText], '#')} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('link with "_blank" target', () => {
    const element = renderer.create(
      <Link node={createLink([fooText], '#', '_blank')} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('link with styled content', () => {
    const element = renderer.create(
      <Link node={createLink([fooTextItalic], '#', '_blank')} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('link with a list of values', () => {
    const element = renderer.create(
      <Link node={createLink([fooTextItalic, fooTextItalic, fooTextItalic], '#', '_blank')} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
