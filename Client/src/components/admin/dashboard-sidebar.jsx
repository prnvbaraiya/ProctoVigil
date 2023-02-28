import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../../assets/logo.png";
import { NavItem } from "./nav-item";
import auth from "../../auth/auth";

const items = [
  {
    href: "/dashboard",
    icon: <SignalCellularAltIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/user",
    icon: <PersonIcon fontSize="small" />,
    title: "User",
  },
  {
    href: "/quiz",
    icon: <LibraryBooksIcon fontSize="small" />,
    title: "Quiz",
  },
  {
    href: "/stream",
    icon: <LiveTvIcon fontSize="small" />,
    title: "Stream",
  },
  {
    href: "/settings",
    icon: <SettingsIcon fontSize="small" />,
    title: "Settings",
  },
];

export const DashboardSidebar = (props) => {
  const name = auth.name;
  const { open, onClose } = props;
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
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
          <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 5 }}>
            <Avatar src={logo}></Avatar>
            <Typography>{name}</Typography>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 1,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
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

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
