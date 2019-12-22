import App from "app";
import React from "react";
import { render } from "react-dom";
import { registerServiceWorker } from "utils/serviceWorker/index";

registerServiceWorker();

render(<App />, document.getElementById("root"));
