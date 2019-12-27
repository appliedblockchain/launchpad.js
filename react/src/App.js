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
            Placeholder for React (frontend) app.
          </p>
          <p>
            <a
              href="https://launchpad.appb.ch/api/health"
            >Healthcheck endpoint</a>
          </p>
          <p>
            <a
              className="App-link"
              href="https://github.com/appliedblockchain/launchpad"
            >Repository</a>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
