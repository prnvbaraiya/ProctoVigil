import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import { SERVER_LINK } from "../../variables/constants";
import UserLayout from "../UserLayout";

function Quiz() {
  const getData = async () => {
    const res = await axios.get(SERVER_LINK + "quizzes");
    console.log(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserLayout>
      <Box display="flex" justifyContent="center">
        <Typography variant="h3"> Quiz</Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid
          container
          sx={{
            background:
              "linear-gradient(195deg, rgba(66, 66, 74, 0.8), rgba(25, 25, 25, 0.8))",

            color: "white",
            marginTop: 2,
            padding: 3,
            borderRadius: "0.75rem",
          }}
        >
          <Grid item xs={10}>
            <Typography variant="h3">
              India Energy Week Quiz <br />
            </Typography>
            <br />
            <Box>
              From :{" "}
              <span style={{ color: theme.palette.success.main }}>
                Feb 4, 2023
              </span>{" "}
            </Box>
            <Box>
              To :{" "}
              <span style={{ color: theme.palette.error.main }}>
                Feb 10, 2023
              </span>
            </Box>
          </Grid>
          <Grid item xs={2} alignItems="center" display="flex">
            <Link to="start">
              <Button variant="contained">Start Quiz</Button>
            </Link>
          </Grid>
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Typography>By: Pranav Baraiya</Typography>
        </Grid>
      </Box>
    </UserLayout>
  );
}

export default Quiz;
