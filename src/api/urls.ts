const apiRoot = "http://localhost:5001/";

export class ApiUrls {
  static Kanban = class KanbanUrls {
    static MOVE_ITEM = `${apiRoot}api/kanban/moveitem`;
    static ADD_ITEM = `${apiRoot}api/kanban/item`;
    static EDIT_ITEM = `${apiRoot}api/kanban/item`;
    static REMOVE_ITEM = `${apiRoot}api/kanban/item`;
    static MOVE_COLUMN = `${apiRoot}api/kanban/movecolumn`;
    static ADD_COLUMN = `${apiRoot}api/kanban/column`;
    static EDIT_COLUMN = `${apiRoot}api/kanban/column`;
    static REMOVE_COLUMN = `${apiRoot}api/kanban/column`;
    static LOAD_BOARD = `${apiRoot}api/kanban/board`;
    static GET_ITEM = `${apiRoot}api/kanban/item`;
  };
  static Board = class BoardUrls {
    static PARTICIPANTS = `${apiRoot}api/board/participants`;
    static CREATE = `${apiRoot}api/board/create`;
    static SEARCH = `${apiRoot}api/board/search`;
    static GET = `${apiRoot}api/board`;
    static EDIT = `${apiRoot}api/board/edit`;
    static REMOVE = `${apiRoot}api/board/remove`;
  };
}

export class ClientUrls {
  static Board = class BoardUrls {
    static EDIT = `/boards/edit`;
    static SEARCH = `/boards/search`;
    static CREATE = `/boards/create`;
    static VIEW = `/boards`;
  };
}
