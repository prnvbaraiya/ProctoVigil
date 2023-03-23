import { Box, Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  blueEvent,
  offlineEvent,
  suffeledArray,
} from "../../../common/Methods";
import {
  AlertDialogBox,
  LoadingSpinner,
  DisplayQuestions,
  ExamHeader,
  QuestionNavigation,
} from "../../../components/index";
import {
  QuizService,
  QuizResultService,
  UserRecordingService,
} from "../../../services/ServerRequest";

const AttemptQuiz = (props) => {
  const { instance, zConfig, attemptQuizData, localS } = props;
  const { id, InputDeviceIds } = attemptQuizData;
  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([1]);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line
  const [answerKey, setAnswerKey] = useState([]);
  const [warningCount, setWarningCount] = useState(0);
  const [submitOpen, setSubmitOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const res = await QuizService.getById(id);
      setData(res.data);

      // Shuffle the options for each question and set the answer key
      const updatedQuestions = res.data.questions.map((item) => {
        const suffeledOptions = suffeledArray(item.options);
        return {
          ...item,
          suffeledOptions,
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
        updatedQuestions.map((item) => ({
          question: item.question,
          userAnswer: [],
          type: item.type,
          takenTime: "",
        }))
      );

      setLoading(false);
    };
    getData();
    if (import.meta.env.VITE_PRODUCTION === "true") {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      }
      window.addEventListener("offline", offlineEvent);
      window.addEventListener("blur", () => blueEvent(setWarningCount));
      return () => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        window.removeEventListener("blur", () => blueEvent(setWarningCount));
        window.removeEventListener("offline", offlineEvent);
      };
    }
    // eslint-disable-next-line
  }, []);

  const sendVideo = async (blob, fileName) => {
    const data = new FormData();
    data.append("quiz_id", id);
    data.append("username", zConfig.userName);
    data.append("videoBlob", blob, fileName);
    const res = await UserRecordingService.set(data);
  };

  const handleSingleAnswerChange = (e) => {
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[selectedQuestion - 1] = {
        ...prevAnswers[selectedQuestion - 1],
        userAnswer: [e.target.value],
      };
      return newAnswers;
    });
  };

  const handleMultipleAnswerChange = (e) => {
    const optionText = e.target.value;
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      const currentAnswer = newAnswers[selectedQuestion - 1];
      const optionIndex = currentAnswer.userAnswer.indexOf(optionText);
      if (e.target.checked) {
        // Add the option text to the selected answers if it's not already there
        if (optionIndex === -1) {
          currentAnswer.userAnswer.push(optionText);
        }
      } else {
        // Remove the option text from the selected answers if it's there
        if (optionIndex !== -1) {
          currentAnswer.userAnswer.splice(optionIndex, 1);
        }
      }
      return newAnswers;
    });
  };

  const handleSuccess = async () => {
    const data = {
      quiz_id: id,
      totalMarks: selectedAnswers.length,
      students: {
        username: zConfig.userName,
        answerKey,
        studentAnswer: selectedAnswers,
        obtainedMarks: -1,
        warningCount,
      },
    };
    const res = await QuizResultService.set(data);
    if (res.status === 202) {
      navigate("/quiz");
    }
  };

  return (
    <>
      <AlertDialogBox
        open={submitOpen}
        setOpen={setSubmitOpen}
        handleSuccess={handleSuccess}
        title={"You really want to Submit?"}
        data={`Question Attempted: ${
          selectedAnswers.filter(({ userAnswer }) => userAnswer.length > 0)
            .length
        }/${questions.length}`}
      />
      <LoadingSpinner loading={loading} />
      {!loading && (
        <Box>
          <Box>
            {data.duration && (
              <ExamHeader
                duration={data.duration * 60}
                setSubmitOpen={setSubmitOpen}
                setIsLoading={setLoading}
              />
            )}
          </Box>
          <Box>
            <Grid container>
              <Grid item xs={9} p={3}>
                <Stack sx={{ position: "relative" }}>
                  <Box>
                    {!loading && (
                      <DisplayQuestions
                        selectedQuestion={selectedQuestion}
                        questions={questions}
                        selectedAnswers={selectedAnswers}
                        handleMultipleAnswerChange={handleMultipleAnswerChange}
                        handleSingleAnswerChange={handleSingleAnswerChange}
                      />
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
                    InputDeviceIds={InputDeviceIds}
                    zConfig={zConfig}
                    selectedQuestion={selectedQuestion}
                    setSelectedQuestion={setSelectedQuestion}
                    selectedAnswers={selectedAnswers}
                    numQuestions={questions.length}
                    instance={instance}
                    setVisitedQuestions={setVisitedQuestions}
                    visitedQuestions={visitedQuestions}
                    entireScreenStream={localS}
                    downloadVideo={sendVideo}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AttemptQuiz;
