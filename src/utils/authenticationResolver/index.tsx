import AuthenticatedLayout from "layouts/authenticated";
import UnanuthenticatedLayout from "layouts/unauthenticated";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";

const AuthenticationResolver = (props: any) => {
  const { isAuthenticated } = props;
  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  });
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
