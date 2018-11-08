import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.css'
import Note from './Note'
import { Button } from '@material-ui/core'

class NotesList extends Component {
  componentDidMount() {
    this.props.fetchNotes()
  }

  renderNoteList() {
    const { notes, previousQuery, offset, searchNotes } = this.props

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
  previousQuery: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  fetchNotes: PropTypes.func.isRequired,
  searchNotes: PropTypes.func.isRequired
}

export default NotesList
