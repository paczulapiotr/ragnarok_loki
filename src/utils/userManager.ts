import { createUserManager } from "redux-oidc";
import { UserManagerSettings } from "oidc-client";
import Config from "utils/config.ts";

const origin = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ""
}`;

const userManagerConfig: UserManagerSettings = {
  client_id: Config.clientId,
  redirect_uri: `${origin}/oidc`,
  response_type: Config.responseType,
  scope: Config.scope,
  authority: Config.authority,
  silent_redirect_uri: `${origin}/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
