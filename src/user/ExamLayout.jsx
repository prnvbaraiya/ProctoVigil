import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/logo.png";

function ExamLayout(props) {
  const { children } = props;

  const Ref = useRef(null);

  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <>
      <Box>
        <Box>
          <AppBar color="default" position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Avatar src={Logo}></Avatar>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    ml: 2,
                    display: "flex",
                    fontWeight: 700,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Procto Vigil
                </Typography>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Box>
                  <Typography variant="h6">Time:</Typography>
                </Box>
                <Box sx={{ marginLeft: "10px", minWidth: "80px" }}>
                  <Typography variant="h6">{timer}</Typography>
                </Box>
                <Box sx={{ marginLeft: "30px", display: "flex", gap: 1 }}>
                  <Button color="error" variant="contained">
                    Cancel
                  </Button>
                  <Button color="secondary" variant="contained">
                    Submit
                  </Button>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={9}>
              {children}
            </Grid>
            <Grid item xs={3}>
              Navigation for Questions
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ExamLayout;
