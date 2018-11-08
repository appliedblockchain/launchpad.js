import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from 'material-ui-search-bar'

class NotesSearch extends Component {
  state = {}

  render () {
    const { searchNotes, query } = this.props

    return (
      <SearchBar
        onChange={(newQuery) => searchNotes(newQuery, 0)}
        onRequestSearch={() => searchNotes(null, 0)}
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
  searchNotes: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
}

export default NotesSearch
