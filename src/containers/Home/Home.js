import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants.js'
import styles from './style.module.css'

const Home = () => (
  <div className={styles.container}>
    <p className={styles.introText}>
      This is the homepage
    </p>
    <p>Link to <Link to={ROUTE_URL.profile}>Profile</Link> page</p>
  </div>
)


export default Home
