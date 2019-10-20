const initialState: IKanbanState = {
  columns: [{ id: 0, index: 0, name: "Name" }],
  items: {
    col_id_1: [],
    col_id_2: []
  },
  canEditColumns: false,
  isSaving: false,
  version: Date.now()
};

export default function(
  state: IKanbanState = initialState,
  { type, payload }: IReducerAction<any>
): IKanbanState {
  switch (type) {
    default:
      return state;
  }
}
