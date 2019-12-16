const isDevelopment = process.env.NODE_ENV === "development";
const apiRoot = isDevelopment
  ? "http://localhost:5001/"
  : "https://ragnarokmimir.azurewebsites.net/";

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
    static SYNCHRONIZE = `${apiRoot}ws/synchronize`;
  };
  static Board = class BoardUrls {
    static NEW_PARTICIPANTS = `${apiRoot}api/board/newparticipants`;
    static PARTICIPANTS = `${apiRoot}api/board/participants`;
    static CREATE = `${apiRoot}api/board/create`;
    static SEARCH = `${apiRoot}api/board/search`;
    static GET = `${apiRoot}api/board`;
    static EDIT = `${apiRoot}api/board/edit`;
    static REMOVE = `${apiRoot}api/board/remove`;
  };
  static Comment = class CommentUrls {
    static GET = `${apiRoot}api/comment/get`;
    static ADD = `${apiRoot}api/comment/add`;
    static DELETE = `${apiRoot}api/comment/delete`;
    static EDIT = `${apiRoot}api/comment/edit`;
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
