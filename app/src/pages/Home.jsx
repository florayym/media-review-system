import React, { Component } from 'react'
import logo from '../logo.svg';

class Home extends Component {
  render() {
    return (
      <div>
        <p>哈哈哈哈哈哈哈哈This is home. This is what you will see first.</p>
        <hr />
        <header className="App-background">

          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {/**
          <a
            className="App-link"
            href="/upload"
            target="_blank"
            rel="noopener noreferrer"
          >
            Upload
          </a>

          <br />

          <a
            className="App-link"
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>
           */}
        </header>
      </div>
    )
  }
}

export default Home