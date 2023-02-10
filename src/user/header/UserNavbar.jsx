import { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
// import { AccountPopover } from "./account-popover";
import logo from "../../assets/logo_Procto-removebg-preview.png";
import avatar from "../../assets/avatar-removebg-preview.png";

const UserNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  color: "black",
  backdropFilter: "blur(5px)",
  boxShadow: theme.shadows[3],
  borderRadius: 15,
  left: 0,
  right: 0,
  margin: "15px auto",
  width: "calc(100% - 100px)",
}));

export const UserNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  // const [openAccountPopover, setOpenAccountPopover] = useState(false);

  return (
    <>
      <UserNavbarRoot>
        <Toolbar
          sx={{
            minHeight: 64,
          }}
        >
          {/* LEFT SIDE  */}
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Home">
            <Avatar src={logo}></Avatar>
          </Tooltip>
          <Tooltip title="Home">
            <Typography sx={{ ml: 1 }}>Procto Vigil</Typography>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          {/* RIGHT SIDE  */}
          <Tooltip title="Home">
            <Typography sx={{ ml: 1 }}>Home</Typography>
          </Tooltip>
          <Avatar
            ref={settingsRef}
            sx={{
              backgroundColor: "black",
              cursor: "pointer",
              height: 40,
              width: 40,
              ml: 5,
            }}
            src={avatar}
          ></Avatar>
        </Toolbar>
      </UserNavbarRoot>
    </>
  );
};

UserNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
