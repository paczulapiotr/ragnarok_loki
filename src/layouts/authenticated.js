import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components

import Sidebar from "components/materialDashboard/Sidebar/Sidebar";
import Navbar from "components/materialDashboard/Navbars/Navbar";
import logo from "public/img/logo.svg";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle";
import { dashboardRoutes, otherRoutes } from "src/routes.ts";

let ps;
const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => (
      <Route
        path={prop.path}
        component={prop.component}
        key={key} // eslint-disable-line
      />
    ))}
    {otherRoutes.map((prop, key) => (
      <Route
        path={prop.path}
        component={prop.component}
        key={key} // eslint-disable-line
      />
    ))}
    <Redirect to="/home" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const color = "blue";
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={dashboardRoutes}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        setOpen={setMobileOpen}
        color={color}
        {...rest}
      />
      <div
        id="scrollbar-container"
        className={classes.mainPanel}
        ref={mainPanel}
      >
        <Navbar
          routes={dashboardRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
      </div>
    </div>
  );
}
