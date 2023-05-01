// ContextMenu.tsx
import { Box, Menu, MenuItem } from "@mui/material";
import React from "react";

export interface ContextMenuItem {
  label: string;
  action: () => void;
}

interface ContextMenuProps {
  x: number;
  y: number;
  handleClose: () => void;
  items: ContextMenuItem[];
  anchor: HTMLElement;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  handleClose,
  items,
  anchor,
}) => {
  const handleClick = (item: ContextMenuItem) => {
    item.action();
    handleClose();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        width: "0px",
        height: "0px",
        top: y,
        left: x,
        zIndex: 10,
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: 2,
      }}
    >
      <Menu
        sx={{
          position: "absolute",
          top: y,
          left: x,
        }}
        id="context-menu"
        anchorEl={anchor}
        open={true}
        onClose={handleClose}
        anchorPosition={{ top: y, left: x }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={() => handleClick(item)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ContextMenu;
