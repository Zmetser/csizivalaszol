import * as React from 'react'
import renderer from 'react-test-renderer'

import { createTextNode } from '../../nodes.js'

import Text from '../Text'

describe('<Text />', () => {
  test('render without formatting', () => {
    const element = renderer.create(
      <Text node={createTextNode('Foo', [])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('apply styles', () => {
    const element = renderer.create(
      <Text node={createTextNode('Foo', ['Bold'])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('apply nested styles', () => {
    const element = renderer.create(
      <Text node={createTextNode('Foo', ['Bold', 'Italic'])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('unknown style falls back to span', () => {
    const element = renderer.create(
      // $FlowSkipForTesting: Testing what happens when a formatting is not supported.
      <Text node={createTextNode('Foo', ['Bold', 'Foo'])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('text with "Italic" style renders with the correct element', () => {
    const element = renderer.create(
      <Text node={createTextNode('Italic', ['Italic'])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Bold" style renders with the correct element', () => {
    const element = renderer.create(
      <Text node={createTextNode('Bold', ['Bold'])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Struck" style renders with the correct element', () => {
    const element = renderer.create(
      <Text node={createTextNode('Struck', ['Struck'])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Small" style renders with the correct element', () => {
    const element = renderer.create(
      <Text node={createTextNode('Small', ['Small'])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Code" style renders with the correct element', () => {
    const element = renderer.create(
      <Text node={createTextNode('Code', ['Code'])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Subscript" style renders with the correct element', () => {
    const element = renderer.create(
      <Text node={createTextNode('Subscript', ['Subscript'])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Superscript" style renders with the correct element', () => {
    const element = renderer.create(
      <Text node={createTextNode('Superscript', ['Superscript'])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Underline" style renders with the correct element', () => {
    const element = renderer.create(
      <Text node={createTextNode('Underline', ['Underline'])} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
