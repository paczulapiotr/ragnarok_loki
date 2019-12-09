interface ISecityConfiguration {
  clientId: string;
  authority: string;
  scope: string;
  responseType: string;
}
const security: ISecityConfiguration = {
  clientId: "loki",
  authority: "https://heimdallidentityserver.azurewebsites.net",
  scope: "openid profile mimir",
  responseType: "token id_token"
};

export default security;
