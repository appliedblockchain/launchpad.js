import React from 'react'
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

export default App
