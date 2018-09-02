/* eslint-disable react/no-array-index-key,import/no-unresolved */
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import withAuth from 'views/auth/components/WithAuth';
import IndexRoute from './routes/index';
// import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Navbar</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/login">Login</a>
            <a className="nav-item nav-link" href="/admin/signup">Admin SignUp</a>
            <a className="nav-item nav-link" href="/signup">Sign Up</a>
          </div>
        </div>
      </nav>
      <h2>Shakacode App</h2>
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" {...this.props} />
          {
            IndexRoute.map((prop, key) => (
              <Route
                path={prop.path}
                key={key}
                component={prop.component}
                {...this.props}
              />
            ))
          }
        </Switch>
      </div>
    </div>
  );
};

export default withAuth(App);
