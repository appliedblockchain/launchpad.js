import React from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import './style.css'

const App = (props) => {
  return (
    <div className="App">
      <Header />
      {props.children}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.array.isRequired
}

export default App
