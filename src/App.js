import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './App.module.css';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import Main from './containers/Main/Main';
import * as actions from './store/action/index';

const App = (props) =>{
  // Destructing props
  const { onCheckAuthState, isAuthenticated, loading } = props;

  // Use effect call every time when onCheckAuthState changes
  useEffect(() => {

    // Call onCheckAuthState to check for token after app refresh
    onCheckAuthState();

  }, [onCheckAuthState]);

  let renderComponent = (
    <Switch>
      <Route path="/main" component={ Main } />
      <Redirect from='/' to='/main' />
    </Switch>    
  );

  if (!isAuthenticated && !loading) {
    renderComponent = (
      <Switch>
        <Route path='/login' component={ Login } />
        <Route path='/signup' component={ Signup } />
        <Redirect from='/' to='/login' />
      </Switch>
    );
  }

  if (loading) {
    renderComponent = (
      <p>Loading...</p>
    );
  }

  return (
    <div className={classes.App}>
      { renderComponent }
    </div>
  );
}

// Receive state from root reducer
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading
  };
};

// Receice dispatch action from actions
const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.authToken())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
