import { connect } from 'react-redux'
import Component from './NotesSearch.js'
import { searchNotes } from 'store/notes'

const mapStateToProps = ({ notes: { query } }) => ({
  query
})

const mapDispatchToProps = dispatch => ({
  searchNotes: data => dispatch(searchNotes(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
