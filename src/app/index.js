import React from "react";
import { OidcProvider } from "redux-oidc";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthenticationResolver from "utils/authenticationResolver";
import store from "../store/root";
import userManager from "../utils/userManager";
import "./style.css";

const App = () => (
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <BrowserRouter>
        <AuthenticationResolver />
      </BrowserRouter>
    </OidcProvider>
  </Provider>
);

export default App;
