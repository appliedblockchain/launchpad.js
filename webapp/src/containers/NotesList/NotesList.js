import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.css'
import Note from './Note'

class NotesList extends Component {
  componentDidMount() {
    this.props.fetchNotes()
  }

  render() {
    const { notes } = this.props
    return (
      <div className={styles.container}>
        {notes.map((note, index) => (
          <Note key={index} note={note} />
        ))}
      </div>
    )
  }
}

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  fetchNotes: PropTypes.func.isRequired
}

export default NotesList
