import React from "react";
import { render } from "react-dom";
import App from "./app";
import { registerServiceWorker } from "utils/serviceWorker/index.ts";

registerServiceWorker();

render(<App />, document.getElementById("root"));
