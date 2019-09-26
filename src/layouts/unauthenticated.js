import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignInView from '../components/views/signIn';
import OidcView from '../components/views/oidc';

const Unauthenticated = () => (
  <Switch>
    <Route path="/oidc" exact component={OidcView} />
    <Route path="/login" exact component={SignInView} />
    <Redirect to="/login" />
  </Switch>
);

export default Unauthenticated;
