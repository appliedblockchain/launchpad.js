import { connect } from 'react-redux'
import { addNote } from 'store/notes'
import Component from './NotesAdd.js'

const mapState = ({ users: { users } }) => ({
  users
})

const mapDispatchToProps = dispatch => ({
  addNote: (tag, message, publicKeys) =>
    dispatch(addNote(tag, message, publicKeys))
})

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
