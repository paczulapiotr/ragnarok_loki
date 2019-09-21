import { createUserManager } from 'redux-oidc';
import Config from './config';

const origin = `${window.location.protocol}//${window.location.hostname}${window.location.port ? (`:${window.location.port}`) : ''}`;

const userManagerConfig = {
  client_id: Config.security.clientId,
  redirect_uri: `${origin}/oidc`,
  response_type: Config.security.responseType,
  scope: Config.security.scope,
  authority: Config.security.authority,
  silent_redirect_uri: `${origin}/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
