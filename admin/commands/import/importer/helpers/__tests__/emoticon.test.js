/**
 * @flow
 */

const {
  isEmoticon,
  asciiEmoticonToUnicode,
  emoticonImageToUnicode
} = require('../emoticon')

describe('Transform text emoticons', () => {
  test('should leave unknown patterns', () => {
    const result = asciiEmoticonToUnicode('All of :these: are unknown or invalid 1:55:16 patterns :a:')
    expect(result).toEqual('All of :these: are unknown or invalid 1:55:16 patterns :a:')
  })

  test('should replace known patterns', () => {
    const result = asciiEmoticonToUnicode('All of these are known patterns :waii: :wink: :evilgrin: :grin:')
    expect(result).toEqual('All of these are known patterns 😊 😉 😏 😀')
  })

  test('should leave unknown short patterns', () => {
    const result = asciiEmoticonToUnicode('All of these are unknown :k or invalid :5:1 patterns :a')
    expect(result).toEqual('All of these are unknown :k or invalid :5:1 patterns :a')
  })

  test('should replace known short patterns', () => {
    const result = asciiEmoticonToUnicode('All of these are known patterns :d :D :p :P :o :O :) :( ;)')
    expect(result).toEqual('All of these are known patterns 😀 😀 😛 😛 😮 😮 🙂 ☹ 😉')
  })
})

describe('Transform image emoticons', () => {
  test('should return true when the image is a known emoticon', () => {
    expect(isEmoticon('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-cool.gif" border="0" alt="" />'))
      .toBe(true)
  })

  test('should return false when the image is a regular image', () => {
    expect(isEmoticon('<img title="" src="image.jpg" border="0" alt="" />'))
      .toBe(false)
  })

  test('should replace to 😎', () => {
    expect(emoticonImageToUnicode('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-cool.gif" border="0" alt="" />'))
      .toBe('😎')
  })

  test('should replace to 😥', () => {
    expect(emoticonImageToUnicode('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-cry.gif" border="0" alt="" />'))
      .toBe('😥')
  })

  test('should replace to ☹', () => {
    expect(emoticonImageToUnicode('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-frown.gif" border="0" alt="" />'))
      .toBe('☹')
  })

  test('should replace to 😘', () => {
    expect(emoticonImageToUnicode('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-kiss.gif" border="0" alt="" />'))
      .toBe('😘')
  })

  test('should replace to 😀', () => {
    expect(emoticonImageToUnicode('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-laughing.gif" border="0" alt="" />'))
      .toBe('😀')
  })

  test('should replace to 🤐', () => {
    expect(emoticonImageToUnicode('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-sealed.gif" border="0" alt="" />'))
      .toBe('🤐')
  })

  test('should replace to 🙂', () => {
    expect(emoticonImageToUnicode('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-smile.gif" border="0" alt="" />'))
      .toBe('🙂')
  })

  test('should replace to 😛', () => {
    expect(emoticonImageToUnicode('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-tongue-out.gif" border="0" alt="" />'))
      .toBe('😛')
  })

  test('should replace to 😉', () => {
    expect(emoticonImageToUnicode('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-wink.gif" border="0" alt="" />'))
      .toBe('😉')
  })

  test('should replace to 😖', () => {
    expect(emoticonImageToUnicode('<img title="" src="js/tiny_mce/plugins/emotions/img/smiley-yell.gif" border="0" alt="" />'))
      .toBe('😖')
  })
})
