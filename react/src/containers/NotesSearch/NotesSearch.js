import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from 'material-ui-search-bar'

class NotesSearch extends Component {
  state = { previousScroll: 0 }

  handleScroll = () => {
    const { searchNotes, query } = this.props
    const { previousScroll } = this.state

    const currentScroll = window.scrollY
    const wrappedElement = document.getElementById('root')
    const isBottom = wrappedElement.getBoundingClientRect().bottom <= window.innerHeight
    const isGoingDown = (currentScroll - previousScroll) > 0

    if (isBottom && isGoingDown && query) {
      searchNotes({ query })
    }

    this.setState({ previousScroll: currentScroll })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    const { searchNotes, query } = this.props

    return (
      <SearchBar
        onChange={newQuery => searchNotes({ query: newQuery })}
        onRequestSearch={() => searchNotes({ query: null, offset: null})}
        style={{
          margin: '0 auto',
          maxWidth: 600
        }}
        value = {query}
      />
    )
  }
}

NotesSearch.propTypes = {
  searchNotes: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
}

export default NotesSearch
