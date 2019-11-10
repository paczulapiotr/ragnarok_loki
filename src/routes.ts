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

const dashboardRoutes: IAppRoute[] = [
  {
    path: "/boards/create",
    name: "New Board",
    icon: Create,
    component: CreateBoardPage
  },
  {
    path: "/boards/search",
    name: "New Board",
    icon: Search,
    component: CreateBoardPage
  }
];

export default dashboardRoutes;
