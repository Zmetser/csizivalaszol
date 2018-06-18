/**
 * @flow
 */

const exporter = require('../normalize')

describe.only('line breaks exporter', () => {
  test('should create a paragraph on double line break and remove brs', () => {
    const result = exporter('Na sziasz!<br><br>KÉRDÉS')
    expect(result).toMatchSnapshot()
  })

  test('should remove br from the beginning of the paragraph', () => {
    const result = exporter('Na sziasz!<br><br><br>KÉRDÉS')
    expect(result).toMatchSnapshot()
  })

  test('should preserve single br', () => {
    const result = exporter('Na sziasz!<br>KÉRDÉS<br>asd')
    expect(result).toMatchSnapshot()
  })
})
