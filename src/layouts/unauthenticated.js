import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignInView from "views/signIn";
import OidcView from "views/oidc";
import { connect } from "react-redux";

const Unauthenticated = ({ isLoggingOut }) => (
  <Switch>
    <Route path="/oidc" exact component={OidcView} />
    <Route path="/" exact component={SignInView} />
    <Route path="/login" exact component={SignInView} />
    <Route path="/signout-callback-oidc" exact component={SignInView} />
    {!isLoggingOut && <Redirect to="/login" />}
  </Switch>
);

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut
  };
}
export default connect(mapStateToProps)(Unauthenticated);
