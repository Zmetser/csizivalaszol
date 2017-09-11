/**
 * @flow
 */

const exporter = require('../normalize')

describe('Export Unordered List', () => {
  test('list with one child', () => {
    const result = exporter('<ul><li>Text</li></ul>')
    expect(result).toMatchSnapshot()
  })

  test('list with multiple child', () => {
    const result = exporter('<ul><li>Text</li><li>Text</li></ul>')
    expect(result).toMatchSnapshot()
  })

  test('list with formatting', () => {
    const result = exporter('<ul><li><strong>Tex</strong><a href="#">t</a></li><li>Text</li></ul>')
    expect(result).toMatchSnapshot()
  })
})

describe('Export Ordered List', () => {
  test('list with one child', () => {
    const result = exporter('<ol><li>Text</li></ol>')
    expect(result).toMatchSnapshot()
  })

  test('list with multiple child', () => {
    const result = exporter('<ol><li>Text</li><li>Text</li></ol>')
    expect(result).toMatchSnapshot()
  })

  test('list with formatting', () => {
    const result = exporter('<ol><li><strong>Tex</strong><a href="#">t</a></li><li>Text</li></ol>')
    expect(result).toMatchSnapshot()
  })
})
