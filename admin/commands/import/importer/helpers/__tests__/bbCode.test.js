/**
 * @flow
 */

const transform = require('../bbCode')

describe('Export emoticon', () => {
  test('[b]', () => {
    const result = transform('[b]should be bold[/b]')
    expect(result).toEqual('<strong>should be bold</strong>')
  })

  test('[size]', () => {
    const result = transform('[size=10][color=red]Olibaggio[/color][/size]')
    expect(result).toEqual('')
  })

  test('[url=$1]$2[/url]', () => {
    const result = transform('[url=http://kvsc.extra.hu/statisztika/februar/0702.pdf]2007. februári statisztika[/url]')
    expect(result).toEqual('<a href="http://kvsc.extra.hu/statisztika/februar/0702.pdf" target="_blank">2007. februári statisztika</a>')
  })

  test('[url]$1[/url]', () => {
    const result = transform('[url]http://kvsc.hu[/url]')
    expect(result).toEqual('<a href="http://kvsc.hu" target="_blank">http://kvsc.hu</a>')
  })
})
