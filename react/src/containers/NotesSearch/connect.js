import { connect } from 'react-redux'
import Component from './NotesSearch.js'
import { searchNotes } from 'store/notes'

const mapDispatchToProps = dispatch => ({
  searchNotes: (query) => dispatch(searchNotes(query))
})

export default connect(
  null,
  mapDispatchToProps
)(Component)
