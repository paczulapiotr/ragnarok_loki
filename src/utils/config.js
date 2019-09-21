export default {
  security: {
    clientId: 'loki',
    authority: 'http://localhost:5000',
    scope: 'openid profile mimir',
    responseType: 'token id_token',
  },
};
