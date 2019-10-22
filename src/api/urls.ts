const apiRoot = "https://localhost:5001/";

export default class ApiUrls {
  static Kanban = class KanbanUrls {
    static MOVE_ITEM = `${apiRoot}api/kanban/moveitem`;
  };
}
