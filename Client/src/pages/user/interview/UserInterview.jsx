import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../../theme";
import { format } from "date-fns";
import { InterviewService, UserService } from "../../../services/ServerRequest";
import { LoadingSpinner } from "../../../components/index";
import auth from "../../../auth/auth";

function UserInterview() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const isDisable = (startDate) => {
    const currentTime = new Date().getTime();
    startDate = new Date(startDate).getTime();
    return currentTime >= startDate;
  };

  const getData = async () => {
    setLoading(true);
    let res = "";
    let date = "";
    if (auth.roles === "admin") {
      res = await InterviewService.get();
      setQuizzes(
        res.data.map((item) => {
          return {
            ...item,
            startDate: format(
              new Date(item.startDate),
              "MMM, dd yyyy hh:mm aa"
            ),
            isAvailable: true,
          };
        })
      );
    } else {
      const usr = await UserService.find({ username: auth.username });
      res = await InterviewService.getByUserId(usr.data[0]._id);
      date = res.data.map(
        (item) =>
          item.studentNames.find((stu) => stu.user_id === usr.data[0]._id)
            .interviewTime
      );
      setQuizzes(
        res.data.map((item, index) => {
          return {
            ...item,
            startDate: format(new Date(date[index]), "MMM, dd yyyy hh:mm aa"),
            isAvailable: isDisable(date[index]),
          };
        })
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <LoadingSpinner loading={loading} />
      <Box>
        <Box display="flex" justifyContent="center">
          <Typography variant="h3">Interview</Typography>
        </Box>
        {!loading && quizzes.length === 0 ? (
          <Typography textAlign="center" m={5} variant="h6">
            There is no Interview Available Come Back Later
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
                      Time :{" "}
                      <span style={{ color: theme.palette.success.main }}>
                        {item.startDate}
                      </span>{" "}
                    </Box>
                  </Grid>
                  <Grid item xs={2} alignItems="center" display="flex">
                    {item.isAvailable ? (
                      <Link to="start" state={{ id: item._id }}>
                        <Button variant="contained" color="secondary">
                          Start Interview
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ opacity: 0.5 }}
                        color="error"
                      >
                        Start Interview
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
      </Box>
    </>
  );
}

export default UserInterview;
