/* eslint-disable react/prop-types */
import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import { withRouter } from 'react-router-dom';
import userManager from 'utils/userManager';


const oidcCallback = (props) => {
  const successCallback = () => {
    console.log('SUCCESS!');
    console.log(props);
    props.history.push('/signedIn');
  };

  const errorCallback = () => {
    console.log('FAILED!');
    console.log(props);
  };

  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={successCallback}
      errorCallback={errorCallback}
    >
      <div>Loading...</div>
    </CallbackComponent>
  );
};

export default withRouter(oidcCallback);
