import { connect } from 'react-redux'
import Component from './NotesList.js'
import { fetchNotes } from 'store/notes'
import { searchNotes } from 'store/notes'

const mapState = (state) => ({
  notes: state.notes.notes
})

const mapDispatchToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchNotes())
})

export default connect(mapState, mapDispatchToProps)(Component)
