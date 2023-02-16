import { useState } from "react";
import { Box, Card, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AuthGuard } from "../components/auth-guard";
import { DashboardNavbar } from "../components/dashboard-navbar";
import { DashboardSidebar } from "../components/dashboard-sidebar";
import { theme } from "../theme/index";
import BreadcrumbsItem from "../components/BreadcrumbsItem";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

const AdminLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <DashboardLayoutRoot>
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
                {children}
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
    </AuthGuard>
  );
};

export default AdminLayout;
