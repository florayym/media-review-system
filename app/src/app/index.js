import React from 'react';
import '../App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { NavBar } from '../components';
import { MediasList, MediasInsert, MediasUpdate, Home, Login, Upload, TestDB } from '../pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import decode from 'jwt-decode';

const checkAuth = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token || !refreshToken) { // has tokens?
    return false;
  }

  try {
    // get expiration time (in millseconds) from payload
    const { exp } = decode(refreshToken); // can decode then no exception thrown

    if (exp < new Date().getTime() / 1000) { // - 1000000000 for expire testing
      return false; // expired!
    }

  } catch (e) { // passed token is invalid!
    return false;
  }

  return true;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={(props) =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/auth/login" }} />
        )
    }
    />
  );
}

//function App() {
const App = () => {
  // let location = useLocation();

  //let { from } = location.state || { from: { pathname: "/" } };
  return (
    <div className="App">
      <Router>

        <NavBar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/home" exact component={Home} /> */}
          <Route path="/" exact component={Home} />

          {/* for testing dashboard */}
          <AuthRoute exact path="/dashboard" component={TestDB} />

          {/** For testing tables */}
          {/* <Route path="/medias/list" exact component={MyTable} /> */}

          <Route path="/medias/list" exact component={MediasList} />
          <Route path="/medias/create" exact component={MediasInsert} />
          <Route path="/medias/update/:id" exact component={MediasUpdate} />

          <Route path="/upload" exact component={Upload} />
          <Route path="/auth/login" exact component={Login} />

        </Switch>

      </Router>
    </div>
  );
}

export default App;