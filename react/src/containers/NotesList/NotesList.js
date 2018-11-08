import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.css'
import Note from './Note'

class NotesList extends Component {
  componentDidMount() {
    this.props.fetchNotes()
  }

  renderNoteList() {
    const { notes } = this.props

    if (notes.length === 0) {
      return <p className="message">No notes found</p>
    }
    return notes.map((note, index) => <Note key={index} note={note} />)
  }

  render() {
    return (
      <div className={styles.container}>
        { this.renderNoteList() }
      </div>
    )
  }
}

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  fetchNotes: PropTypes.func.isRequired
}

export default NotesList
