/**
 * Transform tiny_mce emoticon images to unicode emoticons
 */

const emoticons = {
  'smiley-cool': '😎',
  'smiley-cry': '😥',
  'smiley-frown': '☹',
  'smiley-kiss': '😘',
  'smiley-laughing': '😀',
  'smiley-sealed': '🤐',
  'smiley-smile': '🙂',
  'smiley-tongue-out': '😛',
  'smiley-wink': '😉',
  'smiley-yell': '😖'
}

const asciiEmojiMap = {
  ':waii:': '😊',
  ':wink:': '😉',
  ':evilgrin:': '😏',
  ':grin:': '😀',
  ':d': '😀',
  ':p': '😛',
  ':o': '😮',
  ':)': '🙂',
  ':(': '☹',
  ';)': '😉'
}

function emoticonImageToUnicode (src: string): string {
  const emoticon = Object.keys(emoticons).find(emoticon => src.indexOf(emoticon) !== -1)
  return emoticon ? emoticons[emoticon] : ''
}

function isEmoticon (src: string): boolean {
  return Object.keys(emoticons).some(emoticon => src.indexOf(emoticon) !== -1)
}

function asciiEmoticonToUnicode (text: string): string {
  return emoticonShortStringToUnicode(emoticonStringToUnicode(text))
}

function emoticonStringToUnicode (text: string): string {
  const findingPattern = /([:;][a-zA-Z()])/g

  return text.replace(findingPattern, match =>
    (asciiEmojiMap.hasOwnProperty(match.toLowerCase())) ? asciiEmojiMap[match.toLowerCase()] : match
  )
}

function emoticonShortStringToUnicode (text: string): string {
  const findingPattern = /(:[a-z]{2,10}:)/g

  return text.replace(findingPattern, match =>
    (asciiEmojiMap.hasOwnProperty(match)) ? asciiEmojiMap[match] : match
  )
}

module.exports = {
  isEmoticon,
  emoticonImageToUnicode,
  asciiEmoticonToUnicode
}
