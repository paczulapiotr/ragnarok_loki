import axios, { AxiosResponse } from "axios";
import userManager from "utils/userManager.ts";

const commonHeaders = {
  "Content-Type": "application/json"
};

async function getHeadersWithToken(
  headers?: IHeaders
): Promise<IHeaders | undefined> {
  const user = await userManager.getUser();
  if (user === null) {
    console.warn("User is not authenticated");
    return headers;
  } else {
    return {
      ...headers,
      Authorization: `Bearer ${user.access_token}`
    };
  }
}

export const httpGet = (url: string, params?: any, headers?: IHeaders) =>
  gatewayWorkflow(
    axios.get(url, { headers: { ...headers, ...commonHeaders }, params })
  );

export const httpPost = (url: string, data?: any, headers?: IHeaders) =>
  gatewayWorkflow(
    axios.post(url, data, { headers: { ...headers, ...commonHeaders } })
  );

export const httpDelete = (url: string, params?: any, headers?: IHeaders) =>
  gatewayWorkflow(
    axios.delete(url, { headers: { ...headers, ...commonHeaders }, params })
  );

export const httpPatch = (url: string, data?: any, headers?: IHeaders) =>
  gatewayWorkflow(
    axios.patch(url, data, { headers: { ...headers, ...commonHeaders } })
  );

export const authHttpGet = async (
  url: string,
  params?: any,
  headers?: IHeaders
) => httpGet(url, params, await getHeadersWithToken(headers));

export const authHttpPost = async (
  url: string,
  data?: any,
  headers?: IHeaders
) => httpPost(url, data, await getHeadersWithToken(headers));

export const authHttpPatch = async (
  url: string,
  data?: any,
  headers?: IHeaders
) => httpPatch(url, data, await getHeadersWithToken(headers));

export const authHttpDelete = async (
  url: string,
  data?: any,
  headers?: IHeaders
) => httpDelete(url, data, await getHeadersWithToken(headers));

const error = (json: IJsonData): IJsonResponse => ({
  success: false,
  json
});

const succes = (json: IJsonData): IJsonResponse => ({
  success: true,
  json
});

export async function gatewayWorkflow(
  fetchPromise: Promise<AxiosResponse<any>>
): Promise<IJsonResponse> {
  let response;
  try {
    try {
      response = await fetchPromise;
    } catch (err) {
      return error({ errors: [err.toString()] });
    } // eslint-disable-next-line
    const data = response.data;
    if (response.status === 200) {
      return succes(data);
    }
    // If unauthorized
    if (response.status === 401) {
      return error({
        errors: [response.statusText]
      });
    }
    return error(data);
  } catch (err) {
    return error({
      errors: [err.toString()]
    });
  }
}
