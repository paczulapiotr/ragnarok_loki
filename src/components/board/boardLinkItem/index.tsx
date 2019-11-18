import { Divider, ListItem, ListItemText } from "@material-ui/core";
import { ClientUrls } from "api/urls";
import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

interface Props {
  name: string;
  id: number;
}

const boardLinkBlock = ({ name, id }: Props) => {
  return (
    <div className="board-link">
      <Link to={`${ClientUrls.Board.VIEW}/${id}`}>
        <ListItem>
          <ListItemText primary={name} />
        </ListItem>
      </Link>
      <Divider />
    </div>
  );
};

export default boardLinkBlock;
