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
  const [sections, setSections] = useState([]);
  const { instance, zConfig, attemptQuizData, localS } = props;
  const { id, InputDeviceIds } = attemptQuizData;
  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
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

      const updatedSections = res.data.sections.map((section) => {
        const updatedQuestions = section.questions.map((question) => {
          const suffeledOptions = suffeledArray(question.options);
          return {
            ...question,
            suffeledOptions,
          };
        });
        return {
          ...section,
          questions: suffeledArray(updatedQuestions),
        };
      });
      setSections(updatedSections);
      setSelectedQuestion({
        ...updatedSections[0].questions[0],
        questionIndex: 0,
      });
      setVisitedQuestions((prev) => [
        ...prev,
        updatedSections[0].questions[0].id,
      ]);

      setSelectedAnswers(
        updatedSections.flatMap((section) => {
          return section.questions.map((question) => ({
            section_id: section.id,
            question_id: question.id,
            userAnswer: [],
            type: question.type,
            takenTime: "",
          }));
        })
      );
      setQuestions(updatedSections[0].questions);

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
      const questionIndex = newAnswers.findIndex(
        (answer) => answer.question_id === selectedQuestion.id
      );
      newAnswers[questionIndex] = {
        ...newAnswers[questionIndex],
        userAnswer: [e.target.value],
      };
      return newAnswers;
    });
  };

  const handleMultipleAnswerChange = (e) => {
    const optionText = e.target.value;
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      const currentAnswer = newAnswers.find(
        (answer) => answer.question_id === selectedQuestion.id
      );
      const optionIndex = currentAnswer.userAnswer.indexOf(optionText);
      if (e.target.checked) {
        if (optionIndex === -1) {
          currentAnswer.userAnswer.push(optionText);
        }
      } else {
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
    console.log(data);
    return;
    const res = await QuizResultService.set(data);
    if (res.status === 202) {
      navigate("/quiz");
    }
  };

  const getQuestion = (questionId) => {
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      for (let j = 0; j < section.questions.length; j++) {
        const question = section.questions[j];
        if (question.id === questionId) {
          setSelectedQuestion(question);
          return {
            questionIndex: j,
            question: question,
          };
        }
      }
    }
    // Return null if no question was found
    return null;
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
            {data.totalDuration && (
              <ExamHeader
                duration={data.totalDuration * 60}
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
                      disabled={selectedQuestion.questionIndex === 0}
                      onClick={() => {
                        const questionIndex =
                          selectedQuestion.questionIndex - 1;
                        const prevQuestion = questions[questionIndex];
                        if (!visitedQuestions.includes(prevQuestion.id)) {
                          setVisitedQuestions((prev) => [
                            ...prev,
                            prevQuestion.id,
                          ]);
                        }
                        setSelectedQuestion({
                          ...prevQuestion,
                          questionIndex,
                        });
                      }}
                    >
                      Previous
                    </Button>

                    <Button
                      variant="contained"
                      disabled={
                        selectedQuestion.questionIndex === questions.length - 1
                      }
                      onClick={() => {
                        const questionIndex =
                          selectedQuestion.questionIndex + 1;
                        const nextQuestion = questions[questionIndex];
                        if (!visitedQuestions.includes(nextQuestion.id)) {
                          setVisitedQuestions((prev) => [
                            ...prev,
                            nextQuestion.id,
                          ]);
                        }
                        setSelectedQuestion({
                          ...nextQuestion,
                          questionIndex,
                        });
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
                    selectedAnswers={selectedAnswers}
                    instance={instance}
                    setVisitedQuestions={setVisitedQuestions}
                    visitedQuestions={visitedQuestions}
                    entireScreenStream={localS}
                    downloadVideo={sendVideo}
                    sections={sections}
                    selectedQuestion={selectedQuestion}
                    getQuestion={getQuestion}
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
