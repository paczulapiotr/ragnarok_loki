interface IHeaders {
  [key: string]: string;
}

interface IApiResponse {
  type: HttpResponseType;
  response: IApiData;
}
interface IApiData {
  data: any;
  messages: IApiMessage[];
}

interface IApiMessage {
  text: string;
  type: ApiMessageType;
}
