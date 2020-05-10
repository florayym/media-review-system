import React, { Component } from 'react'

import LoginForm from "../components/LoginForm";
import '../App.css';

import { Dashboard } from '../components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class Login extends Component {
  state = {
    fields: {}
  }

  onSubmit = (fields) => {
    console.log("App comp got: ", fields);
    this.setState({ fields });
  };

  render() {
    return (
      <div className="App">
        <LoginForm onSubmit={fields => this.onSubmit(fields)} />
        <p>
          {JSON.stringify(this.state.fields, null, 2)}
        </p>


        <Router>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />

            <a
              href="/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              Upload
          </a>

          </Switch>
        </Router>



      </div>
    )
  }
}

export default Login