import React from 'react'
/* import PropTypes from 'prop-types' */
import { NavLink } from 'react-router-dom'

import styles from './style.module.css'
const GenerateLoadHeader = () => (
  <div className={styles.container}>
    <NavLink to="/generate-mnemonic">GENERATE MNEMONIC</NavLink>
    <NavLink to="/load-mnemonic">LOAD MNEMONIC</NavLink>
  </div>
)

GenerateLoadHeader.propTypes = {}

export default GenerateLoadHeader
