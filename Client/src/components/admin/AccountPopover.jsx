import React from "react";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import auth from "../../auth/auth";

const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const navigate = useNavigate();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {auth.username}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            auth.logout();
            navigate("/", { replace: true });
          }}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default AccountPopover;
