import { List } from "@material-ui/core";
import React from "react";
interface Props {
  children?: any;
  className?: string;
}
const BoardLinkContainer = ({ children, className }: Props) => {
  return <List className={className}>{children}</List>;
};

export default BoardLinkContainer;
