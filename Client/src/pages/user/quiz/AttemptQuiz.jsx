import { Box, Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import auth from "../../../auth/auth";
import AlertDialogBox from "../../../components/AlertDialogBox";
import ExamHeader from "../../../components/quiz/ExamHeader";
import QuestionNavigation from "../../../components/quiz/QuestionNavigation";
import { zegoInstance } from "../../../config/ZegoConfig";
import { QuizService } from "../../../services/ServerRequest";

function AttemptQuiz() {
  const location = useLocation();
  const id = location.state?.id;
  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([1]);
  const [isLoading, setIsLoading] = useState(true);
  const [zConfig, setZConfig] = useState({
    roomId: id,
    userId: auth.name,
    token: "",
    userName: auth.name,
  });
  // eslint-disable-next-line
  const [answerKey, setAnswerKey] = useState([]);
  const [warningCount, setWarningCount] = useState(0);
  const [submitOpen, setSubmitOpen] = useState(false);
  const instance = zegoInstance();

  // Function to shuffle an array
  const suffeledArray = (len) => {
    const arr = [];
    while (arr.length < len) {
      const rand = Math.floor(Math.random() * len);
      if (!arr.includes(rand)) arr.push(rand);
    }
    return arr;
  };

  const blueEvent = () => {
    alert("You are trying to change window please stay on this window");
    setWarningCount((prev) => prev + 1);
  };

  const offlineEvent = () => {
    alert("There is Problem with your internet");
  };

  useEffect(() => {
    getData();

    // if (!document.fullscreenElement) {
    //   document.documentElement.requestFullscreen();
    // }
    // window.addEventListener("offline", offlineEvent);
    // window.addEventListener("blur", blueEvent);
    // return () => {
    // if (document.fullscreenElement) {
    //   document.exitFullscreen();
    // }
    //   window.removeEventListener("blur", blueEvent);
    //   window.removeEventListener("offline", offlineEvent);
    // };
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    const res = await QuizService.getById(id);
    setData(res.data);

    // Shuffle the options for each question and set the answer key
    const updatedQuestions = res.data.questions.map((item) => {
      const newArray = [item.correct_answer, ...item.incorrect_answer];
      const suffleArr = suffeledArray(newArray.length);
      setAnswerKey((prev) => [...prev, suffleArr.indexOf(0)]);
      return {
        ...item,
        suffeledOptions: suffleArr.map((item) => {
          return newArray[item];
        }),
      };
    });

    // Set the updated questions and set isLoading to false
    setQuestions(updatedQuestions);
    // setQuestions((prevQuestions) => {
    //   const shuffledQuestions = [...updatedQuestions];
    //   for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [shuffledQuestions[i], shuffledQuestions[j]] = [
    //       shuffledQuestions[j],
    //       shuffledQuestions[i],
    //     ];
    //     answerKey
    //   }
    //   return shuffledQuestions;
    // });
    setSelectedAnswers(
      Array.from({ length: res.data.questions.length }, () => null)
    );
    setIsLoading(false);
  };

  const handleAnswerChange = (e) => {
    // Update the selected answers
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[selectedQuestion - 1] = e.target.value;
      return newAnswers;
    });
  };

  const handleSuccess = () => {
    const answeredQuestions = selectedAnswers.filter(
      (item) => item !== null
    ).length;
  };

  return (
    <>
      <AlertDialogBox
        open={submitOpen}
        setOpen={setSubmitOpen}
        handleSuccess={handleSuccess}
        title={"You really want to Submit?"}
        data={`Question Attempted: ${
          selectedAnswers.filter((item) => item !== null).length
        }/${questions.length}`}
      />
      <Box>
        <Box>
          {data.duration && (
            <ExamHeader
              instance={instance}
              duration={data.duration * 60}
              handleSuccess={handleSuccess}
              setSubmitOpen={setSubmitOpen}
              setIsLoading={setIsLoading}
            />
          )}
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={9} p={3}>
              <Stack sx={{ position: "relative" }}>
                <Box>
                  {!isLoading && (
                    <div>
                      {/* Display the current question */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            selectedQuestion +
                            ") " +
                            questions[selectedQuestion - 1].question,
                        }}
                      />
                      {/* Display the options for the current question */}
                      {["A", "B", "C", "D"].map((choice, index) => {
                        const answer =
                          questions[selectedQuestion - 1].suffeledOptions[
                            index
                          ];
                        return (
                          <div key={choice} style={{ marginTop: 5 }}>
                            <label>
                              <input
                                type="radio"
                                value={choice}
                                name={`question-${selectedQuestion}`}
                                checked={
                                  choice ===
                                  selectedAnswers[selectedQuestion - 1]
                                }
                                onChange={(e) => handleAnswerChange(e)}
                              />

                              {`${choice}) ${answer}`}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Box>
                <Box
                  sx={{
                    position: "fixed",
                    bottom: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    width: "70%",
                    padding: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    disabled={selectedQuestion === 1}
                    onClick={() => {
                      setVisitedQuestions((prev) => [
                        ...prev,
                        selectedQuestion,
                      ]);
                      setSelectedQuestion((prev) => prev - 1);
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    disabled={selectedQuestion === questions.length}
                    onClick={() => {
                      setVisitedQuestions((prev) => [
                        ...prev,
                        selectedQuestion,
                      ]);
                      setSelectedQuestion((prev) => prev + 1);
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              {/* Display the question navigation panel */}
              <Box
                component="main"
                sx={{
                  borderLeft: "2px solid black",
                  overflowY: "scroll",
                  height: "calc(100vh - 65px)",
                }}
              >
                <QuestionNavigation
                  zConfig={zConfig}
                  selectedQuestion={selectedQuestion}
                  setSelectedQuestion={setSelectedQuestion}
                  selectedAnswers={selectedAnswers}
                  numQuestions={questions.length}
                  instance={instance}
                  setVisitedQuestions={setVisitedQuestions}
                  visitedQuestions={visitedQuestions}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default AttemptQuiz;
