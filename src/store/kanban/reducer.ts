import { KanbanBoard, KanbanState } from "src/logic/kanban/models.ts";
import { KanbanActionTypes } from "store/kanban/actions.ts";

const initialState = new KanbanState(
  new KanbanBoard(0, "", false, [], new Date())
);

export default function(
  state: IKanbanState = initialState,
  { type, payload }: IReducerAction<KanbanBoardResultDTO>
): IKanbanState {
  switch (type) {
    case KanbanActionTypes.MOVE_ITEM_COMPLETED:
    case KanbanActionTypes.MOVE_ITEM_FAILED:
    case KanbanActionTypes.MOVE_COLUMN_COMPLETED:
    case KanbanActionTypes.MOVE_COLUMN_FAILED:
    case KanbanActionTypes.ADD_ITEM_COMPLETED:
    case KanbanActionTypes.ADD_ITEM_FAILED:
    case KanbanActionTypes.ADD_COLUMN_COMPLETED:
    case KanbanActionTypes.ADD_COLUMN_FAILED:
    case KanbanActionTypes.EDIT_ITEM_COMPLETED:
    case KanbanActionTypes.EDIT_ITEM_FAILED:
    case KanbanActionTypes.EDIT_COLUMN_COMPLETED:
    case KanbanActionTypes.EDIT_COLUMN_FAILED:
    case KanbanActionTypes.REMOVE_ITEM_COMPLETED:
    case KanbanActionTypes.REMOVE_ITEM_FAILED:
    case KanbanActionTypes.REMOVE_COLUMN_COMPLETED:
    case KanbanActionTypes.REMOVE_COLUMN_FAILED:
    case KanbanActionTypes.LOAD_BOARD_COMPLETED:
    case KanbanActionTypes.LOAD_BOARD_FAILED:
      return KanbanState.CreateFromDTO(payload);
    default:
      return state;
  }
}
