const transform = require('../bbCode')

describe('Transform bbcodes', () => {
  test('[b]', () => {
    const result = transform('[b]should be bold[/b]')
    expect(result).toEqual('<strong>should be bold</strong>')
  })

  describe('Admin message', () => {
    test('variant 1', () => {
      const result = transform('[size=10][color=red]Olibaggio[/color][/size]')
      expect(result).toEqual('')
    })

    test('variant 2', () => {
      const result = transform('[size=10][color=red]Olibaggio[/size][/color]')
      expect(result).toEqual('')
    })

    test('announcement', () => {
      const result = transform('[size=18px]Nyílt hét van a Csizi válaszolban![/size] Ami azt jeleni')
      expect(result).toEqual('<strong>Nyílt hét van a Csizi válaszolban!</strong> Ami azt jeleni')
    })
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
