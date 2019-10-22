import { KanbanActionTypes } from "store/kanban/actions.ts";

const initialState: IKanbanState = {
  columns: [
    {
      id: "0",
      index: 0,
      name: "Name 1",
      timestamp: new Date(),
      items: [
        { id: "2", index: 0, name: "item1", timestamp: new Date() },
        { id: "3", index: 1, name: "item2", timestamp: new Date() }
      ]
    },
    {
      id: "1",
      index: 1,
      name: "Name 2",
      timestamp: new Date(),
      items: [{ id: "4", index: 0, name: "item3", timestamp: new Date() }]
    }
  ],
  board: { id: "0", name: "", timestamp: new Date() },
  canEditColumns: false,
  isSaving: false,
  version: Date.now()
};

export default function(
  state: IKanbanState = initialState,
  { type, payload }: IReducerAction<any>
): IKanbanState {
  console.log(type);
  switch (type) {
    case KanbanActionTypes.MOVE_ITEM_COMPLETED:
    case KanbanActionTypes.MOVE_ITEM_FAILED:
      return state;
    default:
      return state;
  }
}
