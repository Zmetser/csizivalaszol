/**
 * Fancy ID generator that creates 20-character string identifiers with the following properties:
 *
 * Original: https://gist.github.com/mikelehen/3596a30bd69384624c11
 *
 * 1. They're based on timestamp so that they sort *after* any existing ids.
 * 3. They sort properly.
 * 4. They're monotonically increasing.  Even if you generate more than one in the same timestamp, the
 *    latter ones will sort after the former ones.  We do this by using the previous random bits
 *    but "incrementing" them by 1 (only in the case of a timestamp collision).
 */
var PUSH_CHARS = '-abcdefghijklmnopqrstvwxyz'

// Timestamp of last push, used to prevent local collisions if you push twice in one ms.
var lastPushTime = 0

var lastRandChars = []

module.exports = (now) => {
  now = now.toString().slice(0, 10)
  var duplicateTime = (now === lastPushTime)
  var i
  lastPushTime = now

  var id = '-' + lastPushTime

  if (!duplicateTime) {
    for (i = 0; i < 9; i++) {
      lastRandChars[i] = i
    }
  } else {
    // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
    for (i = 8; i >= 0 && lastRandChars[i] === 63; i--) {
      lastRandChars[i] = 0
    }
    lastRandChars[i]++
  }
  for (i = 0; i < 9; i++) {
    id += PUSH_CHARS.charAt(lastRandChars[i])
  }
  if (id.length !== 20) throw new Error('Length should be 20. It is: ' + id.length)

  return id
}
