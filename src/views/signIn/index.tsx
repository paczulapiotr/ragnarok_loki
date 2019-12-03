import React, { useEffect } from "react";
import userManager from "utils/userManager.ts";

const logIn = () => {
  useEffect(() => {
    userManager.signinRedirect().then(() => console.log("Redirecting To OIDC"));
  }, []);
  return <div>Loading...</div>;
};
export default logIn;
