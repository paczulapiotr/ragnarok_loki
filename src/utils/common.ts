export function awaited<T>(promise: Promise<T>): T {
  let result: any;
  debugger;
  promise.then(res => (result = res));
  return result;
}
