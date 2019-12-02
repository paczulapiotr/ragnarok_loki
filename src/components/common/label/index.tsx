import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
interface Props {
  children: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f0f0f0",
    padding: "2px 10px",
    marginTop: "10px",
    borderRadius: "4px"
  }
});

const TextLabel = ({ children, variant }: Props) => {
  const classes = useStyles();
  return (
    <Typography className={classes.root} variant={variant || "h6"}>
      {children}
    </Typography>
  );
};

export default TextLabel;
