import { connect } from 'react-redux'
import Component from './NotesList.js'
import { fetchNotes } from 'store/notes'
import { searchNotes } from 'store/notes'

const mapState = (state) => ({
  notes: state.notes.notes,
  previousQuery: state.notes.previousQuery,
  offset: state.notes.offset || 0
})

const mapDispatchToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchNotes()),
  searchNotes: (query, offset) => dispatch(searchNotes(query, offset))
})

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
