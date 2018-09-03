import { connect } from 'react-redux'
import { addNote } from 'store/notes'
import Component from './NotesAdd.js'

export const mapState = ({ users: { users } }) => ({
  users
})
const mapDispatchToProps = dispatch => {
  return {
    addNote: (tag, message, publicKeys) =>
      dispatch(addNote(tag, message, publicKeys))
  }
}

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
