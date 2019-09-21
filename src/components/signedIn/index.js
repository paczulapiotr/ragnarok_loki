import React from 'react';
import userManager from '../../utils/userManager';

const loggedIn = () => {
  const logout = () => {
    userManager.signoutRedirect().then(() => console.log('Logged out!'));
  };
  return (
    <div>
      <h1>UR LOGGED IN :D</h1>
      <button type="button" onClick={logout}>Log out</button>
    </div>
  );
};
export default loggedIn;
