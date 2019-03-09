const exporter = require('../normalize')

test('export link', () => {
  const result = exporter('<a href="http://kvsc.hu" target="_blank">link text</a>')
  expect(result).toMatchSnapshot()
})
