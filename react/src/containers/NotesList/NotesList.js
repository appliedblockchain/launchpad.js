import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.css'
import Note from './Note'

class NotesList extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.authenticated && !state.hasFetchedNotes) {
      props.fetchNotes()
      return { hasFetchedNotes: true }
    }
    return null
  }

  state = { hasFetchedNotes: false }

  renderNoteList() {
    const { notes } = this.props

    return notes.map((note, index) => <Note key={index} note={note} />)
  }

  render() {
    const { notes, offset } = this.props
    const doesNotHaveNotes = !!(notes.length === 0)
    const doesNotHaveAnyMoreNotes = !!(notes.length !== 0 && (offset === null || offset === undefined))

    return (
      <div className={styles.container}>
        { notes.length > 0 && this.renderNoteList() }
        { doesNotHaveNotes && <p className="message">No notes found</p> }
        { doesNotHaveAnyMoreNotes && <p className="message">No more notes found</p> }
      </div>
    )
  }
}

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  offset: PropTypes.oneOfType([
    PropTypes.number, PropTypes.object
  ]),
  fetchNotes: PropTypes.func.isRequired
}

export default NotesList
