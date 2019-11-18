import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./style.scss";

const Loader = () => {
  return (
    <div className={"loader"}>
      <CircularProgress placeholder={"Loading..."} />
    </div>
  );
};

export default Loader;
