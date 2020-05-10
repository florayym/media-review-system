import React from 'react';
import '../App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar, MyTable } from '../components'
import { MediasList, MediasInsert, MediasUpdate, Home, Login, Upload } from '../pages'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Router>
        {/**
         * move NavBar to logged in UI
         */}
        <NavBar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          {/**
         * Use a Consistent Home Page URL
         * 
         * <a href="../">Home</a>
         * <a href="/">Home</a>
         * <a href="http://www.example.com">Home</a>
         * <a href="http://www.example.com/">Home</a>
         */}
          <Route path="/" exact component={Home} />

          {/** For testing tables */}
          <Route path="/medias/list" exact component={MyTable} />

          <Route path="/medias/list" exact component={MediasList} />
          <Route path="/medias/create" exact component={MediasInsert} />
          <Route path="/medias/update/:id" exact component={MediasUpdate} />

          <Route path="/upload" exact component={Upload} />
          <Route path="/login" exact component={Login} />

        </Switch>

      </Router>
    </div>
  );
}

export default App;