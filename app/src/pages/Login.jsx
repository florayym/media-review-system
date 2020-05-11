import React, { Component } from 'react'
import LoginForm from "../components/LoginForm";
import '../App.css';

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

      </div>
    )
  }
}

export default Login