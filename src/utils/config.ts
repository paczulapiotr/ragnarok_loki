interface ISecityConfiguration {
  clientId: string;
  authority: string;
  scope: string;
  responseType: string;
}
const security: ISecityConfiguration = {
  clientId: "loki",
  authority: "http://localhost:5000",
  scope: "openid profile mimir",
  responseType: "token id_token"
};

export default security;
