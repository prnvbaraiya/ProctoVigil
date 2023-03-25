import { React, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Card, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme/index";
import {
  SnackbarDisplay,
  BreadcrumbsItem,
  DashboardNavbar,
  DashboardSidebar,
} from "../../components/index";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const stateData = location.state;
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    type: "success",
    vertical: "top",
    horizontal: "right",
  });

  useEffect(() => {
    stateData &&
      setSnackbarData((prev) => {
        return {
          ...prev,
          open: stateData.open,
          message: stateData.message,
          type: stateData.type,
        };
      });
  }, [stateData]);

  return (
    <>
      <DashboardLayoutRoot>
        <SnackbarDisplay
          snackbarData={snackbarData}
          setSnackbarData={setSnackbarData}
        />
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box>
            <Paper
              sx={{
                m: 2,
                p: 2,
                backgroundColor: theme.palette.neutral[300],
              }}
              varient="outlined"
            >
              <BreadcrumbsItem />
            </Paper>
            <Paper
              sx={{
                m: 2,
                p: 1,
                backgroundColor: theme.palette.neutral[200],
              }}
              varient="outlined"
            >
              <Card
                sx={{
                  p: 2,
                  gap: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Outlet />
              </Card>
            </Paper>
          </Box>
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

export default AdminLayout;
