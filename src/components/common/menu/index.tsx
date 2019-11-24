import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem
} from "@material-ui/core";
import React, { useState } from "react";

interface Props {
  items: MenuItem[];
}

const ContextMenu = ({ items }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClickListItem = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseFactory = (
    callback: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
  ) => (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    handleClose();
    callback(e);
  };

  return (
    <div>
      <List component="div" aria-label="Board menu">
        <ListItem button aria-haspopup="true" onClick={handleClickListItem}>
          <ListItemText primary="Board menu" />
        </ListItem>
      </List>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((x: MenuItem, index: number) => (
          <MenuItem key={index} onClick={handleCloseFactory(x.onClick)}>
            {x.content}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ContextMenu;