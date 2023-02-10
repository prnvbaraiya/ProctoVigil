import { useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo_Procto-removebg-preview.png";
import avatar from "../../assets/avatar-removebg-preview.png";
import { Link } from "react-router-dom";

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
  const { onSidebarOpen } = props;
  const settingsRef = useRef(null);

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
          <Link to="/">
            <Tooltip title="Home">
              <Typography sx={{ ml: 1 }}>Home</Typography>
            </Tooltip>
          </Link>
          <Link to="quiz">
            <Tooltip title="Home">
              <Typography sx={{ ml: 3 }}>Quiz</Typography>
            </Tooltip>
          </Link>
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
