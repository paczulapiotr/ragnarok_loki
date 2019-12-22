/* eslint-disable react/prop-types */
import { User } from "oidc-client";
import React from "react";
import { withRouter } from "react-router-dom";
import { CallbackComponent } from "redux-oidc";
import Loader from "src/components/common/loader";
import userManager from "utils/userManager.ts";

const oidcCallback = (props: any) => {
  const successCallback = (user: User) => {
    props.history.push("/home");
  };

  const errorCallback = () => {};

  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={successCallback}
      errorCallback={errorCallback}
    >
      <div style={{ width: "100%" }}>
        <Loader />
      </div>
    </CallbackComponent>
  );
};

export default withRouter(oidcCallback);
