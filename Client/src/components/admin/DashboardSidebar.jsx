import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { NavItem } from "../index";
import { isSubsciber } from "../../common/Methods";
import { adminSidebarItems, teacherSidebarItems } from "../../common/Data";
import auth from "../../auth/auth";
import { Link } from "react-router-dom";

export const DashboardSidebar = (props) => {
  const items =
    auth.roles === "admin" ? adminSidebarItems : teacherSidebarItems;
  const { open, onClose } = props;
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await isSubsciber();
      setIsValid(res);
    };
    getData();
  });

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Link to="/">
            <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 5 }}>
              <Avatar src={logo}></Avatar>
              <Typography color="white">Procto Vigil</Typography>
            </Box>
          </Link>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 1,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map(({ require, title, icon, href }) => {
            const isAiAnalyzation = require === "aiAnalyzation";
            const shouldRender =
              !isAiAnalyzation || (isAiAnalyzation && isValid);
            return (
              shouldRender && (
                <NavItem key={title} icon={icon} href={href} title={title} />
              )
            );
          })}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default DashboardSidebar;
