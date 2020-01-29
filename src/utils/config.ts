interface ISecityConfiguration {
  clientId: string;
  authority: string;
  scope: string;
  responseType: string;
  apiUrl: string;
}

const security: ISecityConfiguration = {
  clientId: "loki",
  authority: "https://heimdallauth.azurewebsites.net",
  apiUrl: "https://heimdallapiserver.azurewebsites.net",
  scope: "openid profile mimir",
  responseType: "token id_token"
};

export default security;
