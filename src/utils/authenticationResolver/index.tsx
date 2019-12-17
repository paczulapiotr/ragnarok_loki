import AuthenticatedLayout from "layouts/authenticated";
import UnanuthenticatedLayout from "layouts/unauthenticated";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import OfflinePage from "src/views/offline";

interface ConnectionEventsManager {
  ononline: (event: any) => void;
  onoffline: (event: any) => void;
}

const AuthenticationResolver = (props: any) => {
  const { isAuthenticated } = props;
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const redirectOnline = () => {
    setIsOffline(false);
  };

  const redirectOffline = () => {
    setIsOffline(true);
  };

  useEffect(() => {
    const connectionManager: ConnectionEventsManager = document.body as any;
    connectionManager.ononline = () => {
      redirectOnline();
    };

    connectionManager.onoffline = () => {
      redirectOffline();
    };
  }, []);

  return (
    <>
      <Switch>
        <Route path="/offline" exact component={OfflinePage} />
        {isOffline && <Redirect to="/offline" />}
        <Route
          component={
            isAuthenticated ? AuthenticatedLayout : UnanuthenticatedLayout
          }
        />
      </Switch>
    </>
  );
};

AuthenticationResolver.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state: any) {
  return {
    isAuthenticated: state.oidc.user !== null
  };
}
export default connect(mapStateToProps)(AuthenticationResolver);
