export function awaited<T>(promise: Promise<T>): T {
  let result: any;
  promise.then(res => (result = res));
  return result;
}
