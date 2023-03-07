import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextBox from "../../../components/form/TextBox";
import { useFormInput } from "../../../hooks/useFormInput";
import DateTime from "../../../components/form/DateTime";
import SelectChip from "../../../components/form/SelectChip";
import QuestionAdd from "../../../components/form/QuestionAdd";
import auth from "../../../auth/auth";
import { QuizService, UserService } from "../../../services/ServerRequest";
import axios from "axios";

function AddQuiz() {
  const randomQuestionNumber = useFormInput("");
  const [names, setNames] = useState([]);
  const author = useFormInput(auth.username);
  const name = useFormInput("");
  const description = useFormInput("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const duration = useFormInput("");
  const [studentNames, setstudentNames] = useState([]);
  const [questions, setQuestions] = useState([
    { question: "", incorrect_answer: ["", "", ""], correct_answer: "" },
  ]);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await UserService.getStudents();
    setNames(res.data.map((item) => item.username));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRandomQuestions = async () => {
    const data = await axios.get(
      `https://opentdb.com/api.php?amount=${randomQuestionNumber.value}&type=multiple`
    );

    const res = data.data.results.map((item) => {
      return {
        question: item.question,
        incorrect_answer: item.incorrect_answers,
        correct_answer: item.correct_answer,
      };
    });
    setQuestions(res);
  };

  const handleSubmit = async () => {
    const data = {
      author: auth.username,
      name: name.value,
      description: description.value,
      startDate: startDate,
      endDate: endDate,
      duration: duration.value,
      studentNames,
      questions,
    };
    const res = await QuizService.set(data);
    if (res.status === 202) {
      navigate(window.history.back());
    } else {
      alert("There is Some error ", JSON.stringify(res));
    }
  };

  return (
    <>
      {/*Container */}
      <Box>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="..">
            <Button color="error" variant="contained">
              Cancel
            </Button>
          </Link>
          <Typography variant="h6">Add Quiz</Typography>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Save Quiz
          </Button>
        </Box>

        <Divider sx={{ margin: "10px" }} />

        {/* Body  */}
        <form>
          <Stack spacing={3}>
            <TextBox label="Author" disabled={true} {...author} />
            <TextBox label="Name" {...name} />
            <TextBox label="Description" {...description} />
            <Stack
              spacing={{ sm: 3 }}
              direction={{ lg: "row", sm: "column" }}
              sx={{ justifyContent: "space-between" }}
            >
              <DateTime
                label="Start Date"
                value={startDate}
                setValue={setStartDate}
              />
              <DateTime
                label="End Date"
                value={endDate}
                setValue={setEndDate}
              />
              <TextBox
                label="Duration (in minutes)"
                type="number"
                fullWidth={false}
                {...duration}
              />
            </Stack>
            <SelectChip
              label="Students"
              names={names}
              studentNames={studentNames}
              setstudentNames={setstudentNames}
            />
            <Stack
              spacing={{ sm: 3 }}
              direction={{ lg: "row", sm: "column" }}
              sx={{ alignItems: "center" }}
            >
              <Typography>Enter Number of Random Questions</Typography>
              <TextBox
                label="Number of Questions"
                type="number"
                fullWidth={false}
                {...randomQuestionNumber}
              />
              <Button variant="contained" onClick={handleRandomQuestions}>
                Submit
              </Button>
            </Stack>
            <QuestionAdd questions={questions} setQuestions={setQuestions} />
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default AddQuiz;
