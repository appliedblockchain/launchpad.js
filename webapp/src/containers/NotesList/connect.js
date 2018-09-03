import { connect } from 'react-redux'
import Component from './NotesList.js'
import { fetchNotes } from 'store/notes'

export const mapState = ({ notes: { notes } }) => ({
  notes
})
const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes())
  }
}

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
