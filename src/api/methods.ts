import { ApiMessageType, HttpResponseType } from "api/index.ts";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
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

const remapParams = (object: any): URLSearchParams => {
  const params = new URLSearchParams();
  if (object != null) {
    Object.keys(object).forEach(key => {
      const property = object[key];
      if (Array.isArray(property)) {
        property.forEach(elem => params.append(key, elem));
      } else if (property != null) {
        params.append(key, property);
      }
    });
  }
  return params;
};

export const httpGet = (
  url: string,
  params?: any,
  headers?: IHeaders
): Promise<IApiResponse> => {
  return requestWrapper(
    axios.get(url, {
      headers: { ...headers, ...commonHeaders },
      params: remapParams(params)
    })
  );
};

export const httpPost = (url: string, data?: any, headers?: IHeaders) =>
  requestWrapper(
    axios.post(url, data, { headers: { ...headers, ...commonHeaders } })
  );

export const httpDelete = (url: string, data?: any, headers?: IHeaders) =>
  requestWrapper(
    axios.delete(url, { headers: { ...headers, ...commonHeaders }, data })
  );

export const httpPatch = (url: string, data?: any, headers?: IHeaders) =>
  requestWrapper(
    axios.patch(url, data, { headers: { ...headers, ...commonHeaders } })
  );

export const httpPut = (url: string, data?: any, headers?: IHeaders) =>
  requestWrapper(
    axios.put(url, data, { headers: { ...headers, ...commonHeaders } })
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

export const authHttpPut = async (
  url: string,
  data?: any,
  headers?: IHeaders
) => httpPut(url, data, await getHeadersWithToken(headers));

export const authHttpDelete = async (
  url: string,
  data?: any,
  headers?: IHeaders
) => httpDelete(url, data, await getHeadersWithToken(headers));

const responseResult = (
  type: HttpResponseType,
  response: IApiData
): IApiResponse => ({
  type,
  response
});

export async function requestWrapper(
  fetchPromise: Promise<AxiosResponse<IApiData>>
) {
  let status: number;
  let data: IApiData;

  try {
    const { status: st, data: dt } = await fetchPromise;
    status = st;
    data = dt;
  } catch (error) {
    const { response } = error as AxiosError<IApiData>;
    data =
      response != null
        ? response.data
        : {
            data: null,
            messages: [
              { text: "Could not fetch data", type: ApiMessageType.Error }
            ]
          };
    status = response != null ? response.status : 500;
  }
  toastMessages(data.messages);
  if (status >= 200 && status <= 299) {
    return responseResult(HttpResponseType.Ok, data);
  } else if (status === 400) {
    return responseResult(HttpResponseType.BadRequest, data);
  } else if (status === 403) {
    return responseResult(HttpResponseType.Forbidden, data);
  } else if (status === 409) {
    return responseResult(HttpResponseType.Conflict, data);
  } else {
    return responseResult(HttpResponseType.Error, data);
  }
}

const getToasterType = (
  responseType: ApiMessageType
): "info" | "warning" | "error" => {
  switch (responseType) {
    case ApiMessageType.Info:
      return "info";
    case ApiMessageType.Warning:
      return "warning";
    case ApiMessageType.Error:
    default:
      return "error";
  }
};
export function toastMessages(messages: IApiMessage[]) {
  if (Array.isArray(messages)) {
    messages.forEach(x => toast(x.text, { type: getToasterType(x.type) }));
  }
}
