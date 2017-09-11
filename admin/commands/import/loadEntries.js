/**
 * Run the importer on the original db export.
 * After the import is done update all entries in firebase.
 */
const path = require('path')

module.exports = (db) => {
  const importer = require('./importer/index')
  const inputFile = path.resolve(__dirname, '../../../', '_old/db/bejegyzesek.txt')
  const outputFile = path.resolve(__dirname, '../../', 'db/entries.json')

  console.info(`Import entries from
  ${inputFile}
to
  ${outputFile}`)

  importer(inputFile, outputFile).then(() => {
    console.info('Loading entries to firebase')

    const entriesRef = db.ref('entries')
    const entries = require(outputFile)

    entriesRef.update(entries, (error) => {
      if (error) {
        console.error(error)
        process.exit(1)
      } else {
        console.info(`${Object.keys(entries).length} entries were updated`)
        process.exit()
      }
    })
  })
}
