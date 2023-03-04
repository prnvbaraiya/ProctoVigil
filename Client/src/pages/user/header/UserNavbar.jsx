import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../assets/logo.png";
import avatar from "../../../assets/avatar-removebg-preview.png";
import {
  userMenuItem,
  homeMenuItem,
  adminMenuItem,
} from "../../../variables/Data";
import auth from "../../../auth/auth";

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

export const UserNavbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const menuItem = homeMenuItem;
  const settings = auth.roles === "admin" ? adminMenuItem : userMenuItem;
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
            onClick={handleOpenNavMenu}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Menu
            sx={{
              mt: "45px",
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {menuItem.map((setting) => (
              <MenuItem
                component={Link}
                to={setting.link}
                key={setting.title}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">{setting.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
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
            {menuItem.map((item) => (
              <Button key={item.title} component={Link} to={item.link}>
                {item.title}
              </Button>
            ))}
          </Box>
          {auth.isAuthenticated ? (
            <>
              <Avatar
                sx={{
                  backgroundColor: "black",
                  cursor: "pointer",
                  height: 40,
                  width: 40,
                  ml: 3,
                }}
                src={avatar}
                onClick={handleOpenUserMenu}
              ></Avatar>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    component={Link}
                    to={setting.link}
                    key={setting.title}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
                <MenuItem
                  key="logout"
                  onClick={() => {
                    auth.logout();
                    navigate("/", { replace: true });
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button component={Link} underline="hover" to="/login">
                Log in
              </Button>
              <Button component={Link} underline="hover" to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </UserNavbarRoot>
    </>
  );
};
