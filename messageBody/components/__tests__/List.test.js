/**
 * @flow
 */
import renderer from 'react-test-renderer'

import { createTextNode } from '../../nodes.js'

import { OrderedList, UnorderedList } from '../List'

const fooText = createTextNode('Foo', [])

describe('<OrderedList />', () => {
  test('with a single item', () => {
    const element = renderer.create(
      OrderedList({ items: [[fooText]] }, 0)
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('with 2 items', () => {
    const element = renderer.create(
      OrderedList({ items: [[fooText], [fooText]] }, 0)
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})

describe('<UnorderedList />', () => {
  test('with a single item', () => {
    const element = renderer.create(
      UnorderedList({ items: [[fooText]] }, 0)
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('with 2 items', () => {
    const element = renderer.create(
      UnorderedList({ items: [[fooText], [fooText]] }, 0)
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
