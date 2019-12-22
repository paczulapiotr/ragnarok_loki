import Toaster from "components/common/toaster/index";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { OidcProvider } from "redux-oidc";
import store from "store/root";
import AuthenticationResolver from "utils/authenticationResolver/index.tsx";
import userManager from "utils/userManager.ts";
import "./style.scss";

const App = () => {
  return (
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <>
          <BrowserRouter>
            <AuthenticationResolver />
          </BrowserRouter>
          <Toaster />
        </>
      </OidcProvider>
    </Provider>
  );
};

export default App;
