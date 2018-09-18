import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Note from './Note'

class NotesList extends Component {
  componentDidMount() {
    this.props.fetchNotes()
  }
  render() {
    const { notes } = this.props
    return (
      <div
        style={{
          margin: '0 auto',
          maxWidth: '540px'
        }}
      >
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
