import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import { SERVER_LINK } from "../../variables/constants";
import { format } from "date-fns";

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);

  const getData = async () => {
    const res = await axios.get(SERVER_LINK + "quizzes");
    setQuizzes(
      res.data.map((item) => {
        return {
          ...item,
          startDate: format(new Date(item.startDate), "MMM,dd yyyy hh:mm aa"),
          endDate: format(new Date(item.endDate), "MMM,dd yyyy hh:mm aa"),
        };
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Typography variant="h3"> Quiz</Typography>
      </Box>
      {quizzes.map((item) => {
        return (
          <Box
            key={item._id}
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
                  {item.name} <br />
                </Typography>
                <Typography variant="h6">
                  {item.description} <br />
                </Typography>
                <Box>
                  From :{" "}
                  <span style={{ color: theme.palette.success.main }}>
                    {item.startDate}
                  </span>{" "}
                </Box>
                <Box>
                  To :{" "}
                  <span style={{ color: theme.palette.error.main }}>
                    {item.endDate}
                  </span>
                </Box>
              </Grid>
              <Grid item xs={2} alignItems="center" display="flex">
                <Link to="start" state={{ id: item._id }}>
                  <Button variant="contained">Start Quiz</Button>
                </Link>
              </Grid>
              <Divider style={{ width: "100%", margin: "10px 0" }} />
              <Typography>By: Pranav Baraiya</Typography>
            </Grid>
          </Box>
        );
      })}
    </>
  );
}

export default Quiz;
