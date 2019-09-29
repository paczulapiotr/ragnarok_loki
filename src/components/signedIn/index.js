import React, { useState, useEffect } from 'react';
import userManager from 'utils/userManager';

const loggedIn = () => {
  const [values, setValues] = useState('N/A');

  useEffect(() => {
    async function wrapper() {
      const user = await userManager.getUser() || { access_token: '' };
      fetch('http://localhost:5001/api/values',
        {
          mode: 'cors',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(data => setValues(data));
    }
    wrapper();
  }, []);
  const logout = () => {
    userManager.signoutRedirect().then(() => console.log('Logged out!'));
  };

  return (
    <div>
      <h1>YOU ARE LOGGED IN :D</h1>
      <h5>
        {`Claims: ${values.toString()}`}
      </h5>
      <button type="button" onClick={logout}>Log out</button>
    </div>
  );
};
export default loggedIn;
