const path = require('path')
const importer = require('../index')

const inputFile = path.resolve(__dirname, 'bejegyzes_debug.txt')
const outputFile = path.resolve(__dirname, 'entries_debug.json')

importer(inputFile, outputFile)
