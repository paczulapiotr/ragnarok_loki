import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthenticatedLayout from 'layouts/authenticated';
import UnanuthenticatedLayout from 'layouts/unauthenticated';

const AuthenticationResolver = (props) => {
  const { isAuthenticated } = props;
  return (
    <>
      {/* {isAuthenticated ? <AuthenticatedLayout /> : <UnanuthenticatedLayout />} */}
      <AuthenticatedLayout />
    </>
  );
};

AuthenticationResolver.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.oidc.user !== null,
  };
}
export default connect(mapStateToProps)(AuthenticationResolver);
