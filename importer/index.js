const fs = require('fs')
const split = require('split')
const { Transform } = require('stream')

const Entities = require('html-entities').Html5Entities
const entities = new Entities()

const normalize = require('./normalize')
const bbCodeToHTML = require('./helpers/bbCode')
const { usernameToID } = require('./helpers/author')

const [, , inputFile, outputFile] = process.argv

/**
 * Transform the tabulated data into a json.
 * Format 1: `Username|Timestamp|Email|URL|Message|[EOM]`
 * Format 2: `Username|Timestamp|Message|[EOM]`
 */
const toJSON = new Transform({
  transform (chunk, encoding, callback) {
    const [username, timestamp, ...rest] = chunk.toString().split('|')
    const messageIndex = (rest.length === 4) ? 2 /* Format 1 */ : 0 /* Format 2 */
    const message = rest[messageIndex] || ''
    callback(null, JSON.stringify({
      username, timestamp, message
    }))
  }
})

/**
 * Decode HTML entities and remove some misc formatting
 */
const cleanMessage = new Transform({
  transform (chunk, encoding, callback) {
    const post = JSON.parse(chunk.toString())
    const decodedMessage = entities.decode(post.message)
    const cleanedMessage = decodedMessage
      // Remove tinyMCE craziness
      .replace(/\\r\\n/g, '')
      .replace(/\\"/g, '')
    callback(null, JSON.stringify({ ...post, message: cleanedMessage }))
  }
})

/**
 * Transform BBCode to HTML tags
 */
const transformBBCode = new Transform({
  transform (chunk, encoding, callback) {
    const post = JSON.parse(chunk.toString())
    callback(null, JSON.stringify({ ...post, message: bbCodeToHTML(post.message) }))
  }
})

/**
 * Transform the HTML message to a display agnostic format.
 */
const normalizeHTML = new Transform({
  transform (chunk, encoding, callback) {
    const post = JSON.parse(chunk.toString())
    callback(null, JSON.stringify({ ...post, message: normalize(post.message) }))
  }
})

const exportEntry = new Transform({
  transform (chunk, encoding, callback) {
    const post = JSON.parse(chunk.toString())
    const authorId = usernameToID[post.username] || usernameToID['Anonymous']
    callback(null, JSON.stringify({
      authorId,
      publishTime: {
        timestamp: post.timestamp * 1000,
        timezone: 'Europe/Budapest'
      },
      message: post.message
    }))
  }
})

const jsonWriter = new Transform({
  transform (chunk, encoding, callback) {
    const post = '\t' + chunk.toString() + ',\n'
    callback(null, post)
  }
})

const reportProgress = new Transform({
  transform (chunk, encoding, callback) {
    process.stdout.write('.')
    callback(null, chunk)
  }
})

fs.writeFileSync(outputFile, '{"messages": [\n')
const writeStream = fs.createWriteStream(outputFile, { flags: 'r+', start: 15 })
writeStream.on('close', () => {
  fs.appendFileSync(outputFile, ']}')
})

fs.createReadStream(inputFile)
  .pipe(split())
  .pipe(toJSON)
  .pipe(cleanMessage)
  .pipe(transformBBCode)
  .pipe(normalizeHTML)
  .pipe(exportEntry)
  .pipe(jsonWriter)
  .pipe(reportProgress)
  .pipe(writeStream)
