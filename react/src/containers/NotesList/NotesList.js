import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.css'
import Note from './Note'
import { Button } from '@material-ui/core'

class NotesList extends Component {
  componentDidMount() {
    this.props.fetchNotes()
  }

  render() {
    const { notes, previousQuery, offset } = this.props

    return (
      <div className={styles.container}>

        {
          notes.length ?
            notes.map((note, index) => (
              <Note key={index} note={note} />
            ))
            :
            <p className="message">No notes found</p>
        }
        { (previousQuery && offset) &&
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            className={styles.buttonMore}

          >
            LOAD MORE
          </Button>
        }
      </div>
    )
  }
}

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  previousQuery: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  fetchNotes: PropTypes.func.isRequired
}

export default NotesList
