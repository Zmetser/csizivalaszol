/**
 * @flow
 *
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

function emoticonImageToUnicode (src: string): string {
  const emoticon = Object.keys(emoticons).find(emoticon => src.indexOf(emoticon) !== -1)
  return emoticon ? emoticons[emoticon] : ''
}

function isEmoticon (src: string): boolean {
  return Object.keys(emoticons).some(emoticon => src.indexOf(emoticon) !== -1)
}

module.exports = {
  isEmoticon,
  emoticonImageToUnicode
}
