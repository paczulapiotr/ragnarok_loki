import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVertOutlined } from "@material-ui/icons";
import React, { useState } from "react";

interface Props {
  items: MenuItem[];
}

const ContextMenu = ({ items }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClickListItem = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseFactory = (
    callback: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  ) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    handleClose();
    callback(e);
  };

  return (
    <div>
      <IconButton onClick={handleClickListItem}>
        <MoreVertOutlined />
      </IconButton>
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
