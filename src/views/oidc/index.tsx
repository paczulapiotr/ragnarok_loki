/* eslint-disable react/prop-types */
import React from "react";
import { withRouter } from "react-router-dom";
import { CallbackComponent } from "redux-oidc";
import Loader from "src/components/common/loader";
import userManager from "utils/userManager.ts";
import { User } from "oidc-client";

const oidcCallback = (props: any) => {
  const successCallback = (user: User) => {
    console.log("User", user);
    props.history.push("/home");
  };

  const errorCallback = () => {
    console.log("FAILED!");
    console.log(props);
  };

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
