import { KanbanState } from "logic/kanban/index.ts";
import { KanbanActionTypes } from "store/kanban/actions.ts";
import { KanbanBoardDTO } from "typings/kanban/dto";

const initialState: IKanbanState = {
  columns: [],
  board: { id: 0, name: "", timestamp: new Date() },
  canEditColumns: false,
  isSaving: false,
  version: Date.now()
};

export default function(
  state: IKanbanState = initialState,
  { type, payload }: IReducerAction<KanbanBoardDTO>
): IKanbanState {
  console.log(type);
  switch (type) {
    case KanbanActionTypes.MOVE_ITEM_COMPLETED:
    case KanbanActionTypes.MOVE_ITEM_FAILED:
    case KanbanActionTypes.MOVE_COLUMN_COMPLETED:
    case KanbanActionTypes.MOVE_COLUMN_FAILED:
    case KanbanActionTypes.ADD_ITEM_COMPLETED:
    case KanbanActionTypes.ADD_ITEM_FAILED:
    case KanbanActionTypes.ADD_COLUMN_COMPLETED:
    case KanbanActionTypes.ADD_COLUMN_FAILED:
    case KanbanActionTypes.REMOVE_ITEM_COMPLETED:
    case KanbanActionTypes.REMOVE_ITEM_FAILED:
    case KanbanActionTypes.REMOVE_COLUMN_COMPLETED:
    case KanbanActionTypes.REMOVE_COLUMN_FAILED:
      return new KanbanState(payload);
    default:
      return state;
  }
}
