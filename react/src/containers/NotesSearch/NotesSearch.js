import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import styles from './style.module.css'
import SearchBar from 'material-ui-search-bar'

class NotesSearch extends Component {
  state = { query: '' }

  render () {
    const { query } = this.state
    const { searchNotes } = this.props

    return (
      <SearchBar
        onChange={(query) => this.setState({ query })}
        onRequestSearch={() => searchNotes(query)}
        style={{
          margin: '0 auto',
          maxWidth: 600
        }}

        value = { query }
      />
    )
  }
}

NotesSearch.propTypes = {
  searchNotes: PropTypes.func.isRequired
}

export default NotesSearch
