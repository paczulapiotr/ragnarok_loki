/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

*/
// @material-ui/icons
// core components/views for Admin layout
import { Create, Search } from "@material-ui/icons";
import CreateBoardPage from "views/boards/create/index";
import EditBoardPage from "views/boards/edit/index";
import BoardSearchPage from "views/boards/search/index";

export class ClientUrls {
  static Board = class BoardUrls {
    static EDIT = `/boards/edit`;
    static SEARCH = `/boards/search`;
    static CREATE = `/boards/create`;
  };
}

export const dashboardRoutes: ISidebarAppRoute[] = [
  {
    path: "/boards/create",
    name: "New Board",
    icon: Create,
    component: CreateBoardPage
  },
  {
    path: "/boards/search",
    name: "Search Boards",
    icon: Search,
    component: BoardSearchPage
  }
];

export const otherRoutes: IAppRoute[] = [
  {
    name: "Edit Board",
    path: "/boards/edit/:boardId",
    component: EditBoardPage
  }
];
