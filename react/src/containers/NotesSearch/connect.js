import { connect } from 'react-redux'
import Component from './NotesSearch.js'
import { searchNotes } from 'store/notes'

const mapDispatchToProps = dispatch => ({
  searchNotes: (query) => dispatch(searchNotes(query))
})

const mapState = ({ notes: { query } }) => ({
  query
})

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
