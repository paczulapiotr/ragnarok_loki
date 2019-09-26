import React from 'react';
import { OidcProvider } from 'redux-oidc';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from '../store/root';
import userManager from '../utils/userManager';
import Oidc from '../components/oidc';
import SignedIn from '../components/signedIn';
import SignIn from '../components/signIn';
import AuthenticatedLayout from '../layouts/authenticated';

const App = () => (
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <BrowserRouter>
        <AuthenticatedLayout />
      </BrowserRouter>
    </OidcProvider>
  </Provider>
);

export default App;
