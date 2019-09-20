import React from 'react';
import { OidcProvider } from 'redux-oidc';
import { Provider } from 'react-redux';
import store from '../../store/root';
import userManager from '../../utils/userManager';


const App = () => (
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <div>Hi Mark!</div>
    </OidcProvider>
  </Provider>
);

export default App;
