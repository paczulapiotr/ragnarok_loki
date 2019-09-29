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
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
// core components/views for Admin layout
import EmptyPage from 'views/emptyView';
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: EmptyPage,
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: Person,
    component: EmptyPage,
  },
  {
    path: '/table',
    name: 'Table List',
    icon: 'content_paste',
    component: EmptyPage,
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: LibraryBooks,
    component: EmptyPage,
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: BubbleChart,
    component: EmptyPage,
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: LocationOn,
    component: EmptyPage,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: Notifications,
    component: EmptyPage,
  },
];

export default dashboardRoutes;
