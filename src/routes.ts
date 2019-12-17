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
import CreateBoardPage from "views/boards/create";
import EditBoardPage from "views/boards/edit";
import BoardSearchPage from "views/boards/search";
import KanbanViewPage from "views/boards/view";

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
  },
  {
    name: "View Board",
    path: "/boards/:boardId",
    component: KanbanViewPage
  },
  {
    path: "/home",
    name: "Search Board",
    component: BoardSearchPage
  }
];
