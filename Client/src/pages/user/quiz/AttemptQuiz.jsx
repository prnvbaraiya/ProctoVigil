import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExamHeader from "../../../components/ExamHeader";
import QuestionNavigation from "../../../components/QuestionNavigation";
import { zegoInstance } from "../../../config/ZegoConfig";
import { SERVER_LINK } from "../../../variables/constants";

function AttemptQuiz() {
  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array.from({ length: 30 }, () => null)
  );
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [answerKey, setAnswerKey] = useState([]);
  const [warningCount, setWarningCount] = useState(0);
  const location = useLocation();
  const id = location.state?.id;
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
    // Fetch data from API
    getData();
    console.log("QID:", id);
    // if (!document.fullscreenElement) {
    //   document.documentElement.requestFullscreen();
    // }
    // window.addEventListener("offline", offlineEvent);
    // window.addEventListener("blur", blueEvent);
    // return () => {
    //   window.removeEventListener("blur", blueEvent);
    //   window.removeEventListener("offline", offlineEvent);
    // };
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    // Get 30 questions from API
    const res = await axios.get(SERVER_LINK + "quiz/" + id);
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

  return (
    <>
      <Box>
        <Box>
          {data.duration && (
            <ExamHeader instance={instance} duration={data.duration * 60} />
          )}
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={9} p={3}>
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
                      questions[selectedQuestion - 1].suffeledOptions[index];
                    return (
                      <div key={choice} style={{ marginTop: 5 }}>
                        <label>
                          <input
                            type="radio"
                            value={choice}
                            name={`question-${selectedQuestion}`}
                            checked={
                              choice === selectedAnswers[selectedQuestion - 1]
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
                  selectedQuestion={selectedQuestion}
                  setSelectedQuestion={setSelectedQuestion}
                  selectedAnswers={selectedAnswers}
                  numQuestions={questions.length}
                  instance={instance}
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
