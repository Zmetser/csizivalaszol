import renderer from 'react-test-renderer'

import { createTextNode } from '../../nodes.js'

import Text from '../Text'

describe('<Text />', () => {
  test('render without formatting', () => {
    const element = Text(createTextNode('Foo', []))
    expect(element).toBe('Foo')
  })

  test('apply styles', () => {
    const element = renderer.create(
      Text(createTextNode('Foo', ['Bold']))
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('apply nested styles', () => {
    const element = renderer.create(
      Text(createTextNode('Foo', ['Bold', 'Italic']))
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('unknown style falls back to span', () => {
    const element = renderer.create(
      Text(createTextNode('Foo', ['Bold', 'Foo']))
    )
    expect(element.toJSON()).toMatchSnapshot()
  })

  test('text with "Italic" style renders with the correct element', () => {
    const element = renderer.create(
      Text(createTextNode('Italic', ['Italic']))
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Bold" style renders with the correct element', () => {
    const element = renderer.create(
      Text(createTextNode('Bold', ['Bold']))
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Struck" style renders with the correct element', () => {
    const element = renderer.create(
      Text(createTextNode('Struck', ['Struck']))
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Small" style renders with the correct element', () => {
    const element = renderer.create(
      Text(createTextNode('Small', ['Small']))
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Code" style renders with the correct element', () => {
    const element = renderer.create(
      Text(createTextNode('Code', ['Code']))
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Subscript" style renders with the correct element', () => {
    const element = renderer.create(
      Text(createTextNode('Subscript', ['Subscript']))
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Superscript" style renders with the correct element', () => {
    const element = renderer.create(
      Text(createTextNode('Superscript', ['Superscript']))
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('text with "Underline" style renders with the correct element', () => {
    const element = renderer.create(
      Text(createTextNode('Underline', ['Underline']))
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
