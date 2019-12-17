import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
const OfflinePage = () => {
  const history = useHistory();
  const reload = () => history.push("/");
  return (
    <div id="sky-background" style={{ width: "100vw", height: "100vh" }}>
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <div id="offline-panel">
        <span id="offline-title">You are offline</span>
        <span id="offline-desc">connect to the internet</span>
        <Button onClick={reload} variant="contained" color="primary">
          {"Reload"}
        </Button>
      </div>
    </div>
  );
};

export default OfflinePage;
