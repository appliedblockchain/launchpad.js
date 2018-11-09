import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from 'material-ui-search-bar'

class NotesSearch extends Component {
  static getDerivedStateFromProps(props) {
    if (props.query === '') {
      return { query: '' }
    }
    return null
  }

  state = { query: '', previousScroll: 0 }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { searchNotes } = this.props
    const { query, previousScroll } = this.state

    const currentScroll = window.scrollY
    const wrappedElement = document.getElementById('root')
    const isBottom = wrappedElement.getBoundingClientRect().bottom <= window.innerHeight
    const isGoingDown = (currentScroll - previousScroll) > 0

    if (isBottom && isGoingDown && query) {
      searchNotes({ query })
    }

    this.setState({ previousScroll: currentScroll })
  }

  render () {
    const { query } = this.state
    const { searchNotes } = this.props

    return (
      <SearchBar
        onChange={newQuery => searchNotes({ query: newQuery })}
        onRequestSearch={() => searchNotes({ query, offset: null })}
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
