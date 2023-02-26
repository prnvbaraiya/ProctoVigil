import { useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../assets/logo.png";
import avatar from "../../../assets/avatar-removebg-preview.png";

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
          <Box
            sx={{ display: { lg: "flex", xs: "none" }, alignItems: "center" }}
          >
            {" "}
            <Link underline="hover" to="/">
              <Typography sx={{ ml: 1 }}>Home</Typography>
            </Link>
            <Link underline="hover" to="/quiz">
              <Typography sx={{ ml: 3 }}>Quiz</Typography>
            </Link>
            <Link component="button" underline="hover" to="/quiz">
              <Typography sx={{ ml: 3 }}>About Us</Typography>
            </Link>
            <Link component="button" underline="hover" to="/quiz">
              <Typography sx={{ ml: 3 }}>Contact Us</Typography>
            </Link>
            <Link component="button" underline="hover" to="/test">
              <Typography sx={{ ml: 3 }}>Test Page</Typography>
            </Link>
          </Box>
          <Link to="/login">
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
          </Link>
        </Toolbar>
      </UserNavbarRoot>
    </>
  );
};

UserNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
