import React from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import styles from './style.module.css'

const App = ({ children }) => (
  <div className={styles.container}>
    <div>
      <Header />
      {children}
    </div>
  </div>
)


App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired
}

export default App
