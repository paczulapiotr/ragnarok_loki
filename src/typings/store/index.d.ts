interface IReducerAction<T> {
  type: string;
  payload: T;
}

interface IRootState {
  oidc: UserState;
  kanban: IKanbanState;
}
