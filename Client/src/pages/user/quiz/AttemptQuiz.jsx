import { Box, Button, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  blurEvent,
  offlineEvent,
  suffeledArray,
  focusEvent,
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
  const [sections, setSections] = useState([]);
  const { id, InputDeviceIds } = attemptQuizData;
  const [data, setData] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerKey, setAnswerKey] = useState([]);
  const [warningAlert, setWarningAlert] = useState({ count: 0, open: false });
  const [submitOpen, setSubmitOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const res = await QuizService.getById(id);
      setData(res.data);

      const updatedSection = res.data.sections.map((section, sectionIndex) => {
        const updatedQuestions = suffeledArray(section.questions).map(
          (question, questionIndex) => {
            const suffeledOptions = suffeledArray(question.options);
            return {
              ...question,
              suffeledOptions,
              sectionIndex,
              questionIndex,
            };
          }
        );
        return {
          ...section,
          sectionIndex,
          questions: updatedQuestions,
        };
      });

      setSections(updatedSection);
      setSelectedQuestion({
        ...updatedSection[0].questions[0],
      });
      setVisitedQuestions([updatedSection[0].questions[0].id]);
      setSelectedAnswers(
        updatedSection.flatMap((section) => {
          return section.questions.map((question) => ({
            section_id: section.id,
            question_id: question.id,
            userAnswer: [],
            type: question.type,
            takenTime: "",
          }));
        })
      );
      setAnswerKey(
        updatedSection.map((section) => ({
          sectionId: section.id,
          answers: section.questions.map((question) => ({
            questionId: question.id,
            correctAnswer: question.options.filter(
              (option) => option.isCorrect
            ),
          })),
        }))
      );

      setLoading(false);
    };
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (import.meta.env.VITE_PRODUCTION === "true") {
      // Enter fullscreen mode and add event listeners
      document.documentElement.requestFullscreen();
      window.addEventListener("offline", offlineEvent);
      window.addEventListener("blur", () =>
        blurEvent(setWarningAlert, warningAlert)
      );
      window.addEventListener("focus", () => focusEvent(setWarningAlert));
    }

    // Clean up
    return () => {
      if (import.meta.env.VITE_PRODUCTION === "true") {
        if (document && document.fullscreenElement) document.exitFullscreen();
        window.removeEventListener("offline", offlineEvent);
        window.removeEventListener("blur", () =>
          blurEvent(setWarningAlert, warningAlert)
        );
        window.removeEventListener("focus", () => focusEvent(setWarningAlert));
      }
    };
  }, []);

  const sendVideo = async (blob, fileName) => {
    const data = new FormData();
    data.append("quiz_id", id);
    data.append("username", zConfig.userName);
    data.append("videoBlob", blob, fileName);
    await UserRecordingService.set(data);
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
        warningCount: warningAlert.count,
      },
    };
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
            sectionIndex: i,
            question: question,
          };
        }
      }
    }
    alert("Question Not Found ");
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
        }/ tobeUpdated`}
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
                handleSuccess={handleSuccess}
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
                        const prevQuestion =
                          sections[selectedQuestion.sectionIndex].questions[
                            questionIndex
                          ];
                        if (!visitedQuestions.includes(prevQuestion.id)) {
                          setVisitedQuestions((prev) => [
                            ...prev,
                            prevQuestion.id,
                          ]);
                        }
                        setSelectedQuestion(prevQuestion);
                      }}
                    >
                      Previous
                    </Button>

                    <Button
                      variant="contained"
                      disabled={
                        selectedQuestion.questionIndex ===
                        sections[selectedQuestion.sectionIndex].questions
                          .length -
                          1
                      }
                      onClick={() => {
                        const questionIndex =
                          selectedQuestion.questionIndex + 1;
                        const nextQuestion =
                          sections[selectedQuestion.sectionIndex].questions[
                            questionIndex
                          ];
                        if (!visitedQuestions.includes(nextQuestion.id)) {
                          setVisitedQuestions((prev) => [
                            ...prev,
                            nextQuestion.id,
                          ]);
                        }
                        setSelectedQuestion(nextQuestion);
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

AttemptQuiz.prototype = {
  attemptQuizData: PropTypes.object.isRequired,
  zConfig: PropTypes.shape({
    roomId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  instance: PropTypes.object.isRequired,
  localS: PropTypes.string.isRequired,
};

export default AttemptQuiz;
