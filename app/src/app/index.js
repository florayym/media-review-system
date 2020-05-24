import React from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  MediasList, MediasInsert, MediasUpdate,
  Home, Login, UploadPage, SeniorDashboard, Dashboard,
  GalleryPage
} from '../pages';
import decode from 'jwt-decode';

/************* For other auth *************/

const checkAuth = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token || !refreshToken) { // has tokens?
    return false;
  }

  try {
    // get expiration time (in millseconds) from payload
    const { exp } = decode(refreshToken); // can decode then no exception thrown

    if (exp < new Date().getTime() / 1000) {
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

/************* For senior user *************/

const checkSeAuth = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  let useType = "junior";

  if (!token || !refreshToken) { // has tokens?
    return false;
  }

  try {
    const { exp, type } = decode(refreshToken);
    useType = type;

    if (exp < new Date().getTime() / 1000) {
      return 0;
    }

  } catch (e) {
    return 0;
  }

  return useType === 'junior' ? 1 : 2;
}

function AuthSeRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={(props) =>
      checkSeAuth() === 2 ? (
        <Component {...props} /> // senior
      ) : (
          checkSeAuth() === 1 ? (
            <Redirect to={{ pathname: "/dashboard" }} /> // junior
          ) : (
              <Redirect to={{ pathname: "/auth/login" }} /> // visitor
            )
        )
    }
    />
  );
}

/************* For Application Main UI *************/

//function App() {
const App = () => {

  return (
    <div className="App">

      <Router>
        <Switch> {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Route path="/home" exact component={Home} />
          <Route path="/" exact component={Home} />

          <AuthSeRoute path="/se/dashboard" exact component={SeniorDashboard} />
          <AuthRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/auth/login" exact component={Login} />

          <Route path="/gallery" exact component={GalleryPage} />
          <Route path="/upload" exact component={UploadPage} />

          {/* <Route path="/medias/list" exact component={MyTable} /> */}
          <Route path="/medias/list" exact component={MediasList} />
          <Route path="/medias/create" exact component={MediasInsert} />
          <Route path="/medias/update/:id" exact component={MediasUpdate} />

        </Switch>
      </Router>

    </div>
  );
}

export default App;