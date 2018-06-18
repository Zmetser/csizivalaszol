/**
 * @flow
 */
import renderer from 'react-test-renderer'

import LineBreak from '../LineBreak'

describe('<br />', () => {
  test('line break', () => {
    const element = renderer.create(
      LineBreak()
    )
    expect(element.toJSON()).toMatchSnapshot()
  })
})
