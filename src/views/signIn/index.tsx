import React from "react";
import userManager from "utils/userManager.ts";

const logIn = () => (
  <div>
    <button
      type="button"
      onClick={() => {
        userManager
          .signinRedirect()
          .then(() => console.log("Redirecting To OIDC"));
      }}
    >
      Sign In
    </button>
  </div>
);

export default logIn;
