const path = require('path')
const admin = require('firebase-admin')
const argv = require('minimist')(process.argv.slice(2))

function help () {
  console.info(`Csizi valaszol admin commands
  --import
    "authors"  import authors from old dump
    "entries"  import entries from old dump
  `)
}

const serviceAccount = require(path.resolve(__dirname, 'serviceAccountKey.json'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://csizivalaszol.firebaseio.com',
  databaseAuthVariableOverride: {
    uid: serviceAccount.uid
  }
})

const db = admin.database()

if (argv.import) {
  switch (argv.import) {
    case 'authors':
      require('./commands/import/loadAuthors')(db)
      break
    case 'entries':
      require('./commands/import/loadEntries')(db)
      break
    default:
      help()
      process.exit()
  }
} else {
  help()
  process.exit()
}

