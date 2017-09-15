import React, { Component } from 'react'
import Assets from './assets'
import './style.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={Assets.logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default App
