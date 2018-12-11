import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Placeholder for React (frontend) app. Please click link below for mantle example. 
          </p>
          <a
            className="App-link"
            href="https://github.com/appliedblockchain/mantle-demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mantle Demo
          </a>
        </header>
      </div>
    );
  }
}

export default App;
