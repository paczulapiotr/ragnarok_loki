import React, { useEffect } from "react";
import userManager from "utils/userManager.ts";
import Loader from "src/components/common/loader";

const logIn = () => {
  useEffect(() => {
    userManager.signinRedirect().then(() => console.log("Redirecting To OIDC"));
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Loader />
    </div>
  );
};
export default logIn;
