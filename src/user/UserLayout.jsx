import { Box, Paper, styled, Typography } from "@mui/material";
import React from "react";
import { UserNavbar } from "./header/UserNavbar";
import bgImg from "../assets/bg-presentation.88963029.jpg";
import { theme } from "../theme";
import Footer from "./footer/Footer";
// import theme from "../theme/index";

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

function UserLayout(props) {
  const { children } = props;
  const text = sentences[Math.floor(Math.random() * (4 - 0 + 1) + 0)];

  return (
    <UserLayoutRoot>
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
          <Typography variant="h1">Procto Vigil</Typography>
          <Typography variant="h5">{text}</Typography>
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
          {children}
        </Paper>
      </Box>
      <Footer />
    </UserLayoutRoot>
  );
}

export default UserLayout;
