import { KanbanBoard, KanbanState } from "src/logic/kanban/models.ts";
import { KanbanActionTypes } from "store/kanban/actions.ts";
import { KanbanBoardDTO } from "typings/kanban/dto";

const initialState = new KanbanState(new KanbanBoard(0, "", [], new Date()));

export default function(
  state: IKanbanState = initialState,
  { type, payload }: IReducerAction<any>
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
    case KanbanActionTypes.REMOVE_ITEM_COMPLETED:
    case KanbanActionTypes.REMOVE_ITEM_FAILED:
    case KanbanActionTypes.REMOVE_COLUMN_COMPLETED:
    case KanbanActionTypes.REMOVE_COLUMN_FAILED:
    case KanbanActionTypes.LOAD_BOARD_COMPLETED:
    case KanbanActionTypes.LOAD_BOARD_FAILED:
      return KanbanState.CreateFromDTO(payload as KanbanBoardDTO);

    case KanbanActionTypes.BOARD_EDIT_MODE_CHANGE:
      return {
        ...state,
        canEditColumns: payload as boolean
      };
    default:
      return state;
  }
}
