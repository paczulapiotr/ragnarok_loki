import React from 'react';
import { OidcProvider } from 'redux-oidc';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from '../../store/root';
import userManager from '../../utils/userManager';
import Oidc from '../oidc';
import SignedIn from '../signedIn';
import SignIn from '../signIn';

const App = () => (
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <BrowserRouter>
        <Switch>
          <Route path={['/', '/signIn', '/signout-callback-oidc']} exact component={SignIn} />
          <Route path="/signedIn" exact component={SignedIn} />
          <Route path="/oidc" exact component={Oidc} />
        </Switch>
      </BrowserRouter>
    </OidcProvider>
  </Provider>
);

export default App;
