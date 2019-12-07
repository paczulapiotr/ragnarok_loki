import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
interface Props {
  children: JSX.Element[] | JSX.Element | string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgb(250, 250, 250);",
    borderBottomColor: "rgb(234, 237, 237)",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    padding: "2px 10px",
    borderRadius: "4px"
  }
});

const HeaderTitle = ({ children, variant, className }: Props) => {
  const classes = useStyles();
  return (
    <Typography
      component="div"
      className={classes.root + " " + className}
      variant={variant || "h6"}
    >
      {children}
    </Typography>
  );
};

export default HeaderTitle;
