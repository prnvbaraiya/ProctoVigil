import { Box, Paper, styled } from "@mui/material";
import React, { useEffect } from "react";
import { UserNavbar } from "./header/UserNavbar";
import bgImg from "../../assets/bg.jpg";
import { theme } from "../../theme";
import Footer from "./footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { SnackbarDisplay, TypedEffect } from "../../components/index";

const UserLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.body,
}));

const sentences = [
  "Hey there, don't try to cheat. Someone is watching you!",
  "Procto Vigil: The ultimate online proctoring solution",
  "Say goodbye to sneaky cheaters and hello to fair exams",
  "Exams just got fairer with Procto Vigil on the job",
  "Trust us, your exams are in good hands with Procto Vigil",
];

function UserLayout() {
  const location = useLocation();
  const stateData = location.state;
  const [snackbarData, setSnackbarData] = React.useState({
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
    <UserLayoutRoot>
      <SnackbarDisplay
        snackbarData={snackbarData}
        setSnackbarData={setSnackbarData}
        sx={{ marginTop: "60px" }}
      />
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          background: `url(${bgImg}) center top / cover transparent`,
          flexDirection: "column",
          width: "100%",
          backgroundSize: "cover",
          height: "75vh",
          color: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "50px",
            height: "100%",
          }}
        >
          <TypedEffect sentences={sentences} title="Procto Vigil" />
        </Box>
        <UserNavbar />
      </Box>
      <Box>
        <Paper
          sx={{
            margin: "-64px 24px 32px",
            minHeight: "55vh",
            boxShadow: "rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "saturate(200%) blur(30px)",
            border: "0px solid rgba(0, 0, 0, 0.125)",
            backgroundClip: "border-box",
            overflow: "visible",
            borderRadius: "0.75rem",
            padding: "16px",
          }}
        >
          <Outlet />
        </Paper>
      </Box>
      <Footer />
    </UserLayoutRoot>
  );
}

export default UserLayout;
