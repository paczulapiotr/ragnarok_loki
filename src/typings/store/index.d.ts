interface IReducerAction<T> {
  type: string;
  payload: T;
}
