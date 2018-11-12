const getNote = require('./getNote.js')
const addNote = require('./addNote.js')
const getNotesContract = require('./getNotesContract.js')
const getNotesCount = require('./getNotesCount.js')
const getNotes = require('./getNotes.js')
const searchNotes = require('./searchNotes.js')

module.exports = [ searchNotes, addNote, getNotesCount, getNote, getNotes, getNotesContract ]
