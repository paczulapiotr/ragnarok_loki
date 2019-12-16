interface ISecityConfiguration {
  clientId: string;
  authority: string;
  scope: string;
  responseType: string;
}

const isDevelopment = process.env.NODE_ENV === "development";
const authority = isDevelopment
  ? "http://localhost:5000"
  : "https://heimdallidentityserver.azurewebsites.net";

const security: ISecityConfiguration = {
  clientId: "loki",
  authority,
  scope: "openid profile mimir",
  responseType: "token id_token"
};

export default security;
