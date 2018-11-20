import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from 'material-ui-search-bar'
import styles from './style.module.css'

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

  handleSearch = newQuery => {
    const { searchNotes } = this.props
    this.setState({ query: newQuery }, () => searchNotes({ query: newQuery }))
  }

  render () {
    const { query } = this.state
    const { searchNotes } = this.props

    return (
      <div className={styles.search}>
        <SearchBar
          onChange={this.handleSearch}
          onRequestSearch={() => searchNotes({ query, offset: null })}
          value={query}
        />
      </div>
    )
  }
}

NotesSearch.propTypes = {
  searchNotes: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
}

export default NotesSearch
