/**
 * rename from App.js
 */
import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from '../components'
import { MediasList, MediasInsert, MediasUpdate, Login, Upload } from '../pages'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Router>
        {/* move NavBar to logged in UI */}
        <NavBar />
        <header className="App-header">
          {/*
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        */}
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
        </header>


        <Switch>
          <Route path="/medias/list" exact component={MediasList} />
          <Route path="/medias/create" exact component={MediasInsert} />
          <Route path="/medias/update/:id" exact component={MediasUpdate} />

          <Route path="/login" exact component={Login} />
          <Route path="/upload" exact component={Upload} />
        </Switch>
      </Router>


    </div>
  );
}

export default App;