interface IHeaders {
  [key: string]: string;
}

interface IJsonResponse {
  success: boolean;
  json: IJsonData;
}

interface IJsonData {
  data?: any;
  metadata?: any;
  errors?: string[];
}
