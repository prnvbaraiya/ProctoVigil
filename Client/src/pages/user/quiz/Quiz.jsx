import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../../theme";
import { format } from "date-fns";
import { QuizService } from "../../../services/ServerRequest";

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);

  const isDisable = (startDate, endDate) => {
    const currentTime = new Date().getTime();
    startDate = new Date(startDate).getTime();
    endDate = new Date(endDate).getTime();
    return currentTime >= startDate && currentTime < endDate;
  };

  const getData = async () => {
    const res = await QuizService.get();
    setQuizzes(
      res.data.map((item) => {
        return {
          ...item,
          startDate: format(new Date(item.startDate), "MMM,dd yyyy hh:mm aa"),
          endDate: format(new Date(item.endDate), "MMM,dd yyyy hh:mm aa"),
          isAvailable: isDisable(item.startDate, item.endDate),
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
        <Typography variant="h3">Quiz</Typography>
      </Box>
      {quizzes.length === 0 ? (
        <Typography textAlign="center" m={5} variant="h6">
          There is no Quiz Available Come Back Later
        </Typography>
      ) : (
        quizzes.map((item) => {
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
                  {item.isAvailable ? (
                    <Link to="start" state={{ id: item._id }}>
                      <Button variant="contained" color="secondary">
                        Start Quiz
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{ opacity: 0.5 }}
                      color="error"
                    >
                      Start Quiz
                    </Button>
                  )}
                </Grid>
                <Divider style={{ width: "100%", margin: "10px 0" }} />
                <Typography>
                  By: {item?.author?.firstName + " " + item?.author?.lastName}
                </Typography>
              </Grid>
            </Box>
          );
        })
      )}
    </>
  );
}

export default Quiz;
