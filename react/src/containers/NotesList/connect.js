import { connect } from 'react-redux'
import Component from './NotesList.js'
import { fetchNotes } from 'store/notes'

const mapState = ({ notes: { notes } }) => ({
  notes
})

const mapDispatchToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchNotes())
})

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
