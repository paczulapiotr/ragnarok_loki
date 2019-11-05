import AuthenticatedLayout from "layouts/authenticated";
import UnanuthenticatedLayout from "layouts/unauthenticated";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

const AuthenticationResolver = (props: any) => {
  const { isAuthenticated } = props;
  return (
    <>
      {isAuthenticated ? <AuthenticatedLayout /> : <UnanuthenticatedLayout />}
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
