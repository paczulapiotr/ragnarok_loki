export function result(type: string, payload: any): IReducerAction<any> {
  return { type, payload };
}
