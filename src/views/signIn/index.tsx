import { Button } from "@material-ui/core";
import React, { useState } from "react";
import userManager from "utils/userManager.ts";
import "./sky.scss";
import Loader from "src/components/common/loader";
const logIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const logInHandler = async () => {
    setIsLoading(true);
    await userManager.signinRedirect();
    setIsLoading(false);
  };
  return (
    <div id="sky-background" style={{ width: "100vw", height: "100vh" }}>
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <div id="login-panel">
        <span id="login-title">Heimdall</span>
        <span id="login-desc">Responsive Kanban Board</span>
        {isLoading ? (
          <Loader />
        ) : (
          <Button
            id={"login-button"}
            onClick={logInHandler}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {"Log in"}
          </Button>
        )}
      </div>
    </div>
  );
};
export default logIn;
