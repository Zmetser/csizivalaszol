/**
 * Update all authors extracted from the original db export.
 */
module.exports = (db) => {
  const usersRef = db.ref('users')
  const { authors } = require('./importer/helpers/author')

  usersRef.update(authors, (error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    } else {
      console.info(`${Object.keys(authors).length} authors were updated`)
      process.exit()
    }
  })
}
