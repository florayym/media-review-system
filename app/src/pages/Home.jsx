import React, { Component } from 'react'
import logo from '../logo.svg';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TestDB } from '../pages'

class Home extends Component {
  render() {
    return (
      <div>
        <header className="App-background">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            欢迎来到多媒体资料在线审核系统！
          </h1>
          {/**
          <a
            className="App-link"
            href="/upload"
            target="_blank"
            rel="noopener noreferrer"
          >
            Upload
          </a>
           */}
           
          <a target="_self" rel="noopener noreferrer" href="/testdb">Go to dashboard .</a>
           <Router>
          <Switch>

            <Route path="/testdb" exact component={TestDB} />

          </Switch>
        </Router>

        </header>
      </div>
    )
  }
}

export default Home