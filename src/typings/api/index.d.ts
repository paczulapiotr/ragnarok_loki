interface IHeaders {
  [key: string]: string;
}

enum ApiMessageType {
  Info = 0,
  Warning = 1,
  Error = 2
}
interface IApiResponse {
  success: boolean;
  response: IApiData;
}
interface IApiData {
  data: any;
  messages: IApiMessage;
}

interface IApiMessage {
  text: string;
  type: ApiMessageType;
}
