/**
 * @flow
 */
import * as React from 'react'
import renderer from 'react-test-renderer'

import { UnknownNodeError } from '../../errors'

import {
  createList,
  createTextNode
} from '../../nodes.js'

import List, { OrderedList, UnorderedList } from '../List'
import render from '../../renderer/renderMessage';

const fooText = createTextNode('Foo', [])

describe('<OrderedList />', () => {
  test('with a single item', () => {
    const element = renderer.create(
      <OrderedList node={createList([[fooText]], 'Number')} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('with 2 items', () => {
    const element = renderer.create(
      <OrderedList node={createList([[fooText], [fooText]], 'Number')} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})

describe('<UnorderedList />', () => {
  test('with a single item', () => {
    const element = renderer.create(
      <UnorderedList node={createList([[fooText]], 'Bullet')} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
  test('with 2 items', () => {
    const element = renderer.create(
      <UnorderedList node={createList([[fooText], [fooText]], 'Bullet')} />
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
