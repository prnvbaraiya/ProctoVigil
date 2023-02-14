import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ExamHeader from "../../components/ExamHeader";
import QuestionNavigation from "../../components/QuestionNavigation";

function AttemptQuiz() {
  const [questions, setQuestions] = useState([]);
  const [que, setQue] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (!document.fullscreenElement) {
    //   document.documentElement.requestFullscreen();
    // }
    // window.addEventListener("offline", (event) => {
    //   alert("There is Problem with your internet");
    // });
    // window.addEventListener("blur", () => {
    //   alert("You are trying to change window please stay on this window");
    // });
    // return () => {
    //   window.removeEventListener("blur");
    //   window.removeEventListener("offline");
    // };
    getData();
  }, []);

  const getData = async () => {
    const data = await axios.get("https://opentdb.com/api.php?amount=30");
    console.log(data.data);
    setQuestions(data.data.results);
    setIsLoading(false);
  };

  return (
    <>
      <Box>
        <Box>
          <ExamHeader />
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={9} p={3}>
              {!isLoading && (
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: que + ") " + questions[que - 1].question,
                    }}
                  />
                  <div style={{ marginTop: 5 }}>
                    A) {questions[que - 1].correct_answer}
                  </div>
                  <div style={{ marginTop: 5 }}>
                    B) {questions[que - 1].incorrect_answers[0]}
                  </div>
                  {questions[que - 1].incorrect_answers[1] && (
                    <>
                      <div style={{ marginTop: 5 }}>
                        C) {questions[que - 1].incorrect_answers[1]}
                      </div>
                      <div style={{ marginTop: 5 }}>
                        D) {questions[que - 1].incorrect_answers[2]}
                      </div>
                    </>
                  )}
                </div>
              )}
            </Grid>
            <Grid item xs={3}>
              <Box
                component="main"
                sx={{
                  borderLeft: "2px solid black",
                  overflowY: "scroll",
                  height: "calc(100vh - 65px)",
                }}
              >
                <QuestionNavigation que={que} setQue={setQue} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default AttemptQuiz;
