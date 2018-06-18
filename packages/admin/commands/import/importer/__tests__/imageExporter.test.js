/**
 * @flow
 */

const exporter = require('../normalize')

describe('Export emoticon', () => {
  test('cool', () => {
    const result = exporter('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-cool.gif" border="0" alt="" />')
    expect(result).toMatchSnapshot()
  })

  test('yell', () => {
    const result = exporter('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-yell.gif" border="0" alt="" />')
    expect(result).toMatchSnapshot()
  })
})

describe('Export image', () => {
  test('', () => {
    const result = exporter('<img src="https://images-cdn.9gag.com/photo/abp6MBL_700b.jpg" border="0" alt="Ragnar" height="653" width="700" />')
    expect(result).toMatchSnapshot()
  })
})
