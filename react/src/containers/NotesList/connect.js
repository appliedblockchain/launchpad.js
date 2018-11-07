import { connect } from 'react-redux'
import Component from './NotesList.js'
import { fetchNotes } from 'store/notes'

const mapState = (state) => ({
  notes: state.notes.notes,
  previousQuery: state.notes.previousQuery,
  offset: state.notes.offset
})

const mapDispatchToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchNotes())
})

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
