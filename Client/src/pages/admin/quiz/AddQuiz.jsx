import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TextBox from "../../../components/form/TextBox";
import { useFormInput } from "../../../hooks/useFormInput";
import DateTime from "../../../components/form/DateTime";
import SelectChip from "../../../components/form/SelectChip";
import QuestionAdd from "../../../components/form/QuestionAdd";
import auth from "../../../auth/auth";
import { QuizService, UserService } from "../../../services/ServerRequest";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { getRandomQuestions } from "../../../common/Methods";

function AddQuiz() {
  const [loading, setLoading] = React.useState(false);
  const [studentNames, setStudentNames] = useState([]);
  const author = useFormInput(auth.username);
  const name = useFormInput("");
  const description = useFormInput("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const duration = useFormInput("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const randomQuestionNumber = useFormInput("");
  // const [sections, setSections] = useState([
  //   {
  //     title: "",
  //     duration: "",
  //     questions: [
  //       {
  //         type: "multiple",
  //         question: "",
  //         options: [{ text: "", isCorrect: false }],
  //       },
  //     ],
  //   },
  // ]);
  const [questions, setQuestions] = useState([
    {
      type: "multiple",
      question: "",
      options: [{ text: "", isCorrect: false }],
    },
  ]);
  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    const res = await UserService.getStudents();
    setStudentNames(
      res.data.map((item) => {
        return { title: item.username, value: item._id };
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
      setEndDate(new Date(startDate).getTime() + (duration.value * 60 || 0));
    }
    setLoading(false);
  }, [startDate, endDate, duration]);

  const handleRandomQuestions = async () => {
    setLoading(true);
    const tmpQuestions = await getRandomQuestions(randomQuestionNumber.value);
    setQuestions(tmpQuestions);
    randomQuestionNumber.onChange("");
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      author: auth.username,
      name: name.value,
      description: description.value,
      startDate: startDate,
      endDate: endDate,
      duration: duration.value,
      studentNames: selectedStudents.map((selectedValue) => {
        const selectedName = studentNames.find(
          (name) => name.title === selectedValue
        );
        return selectedName.value;
      }),
      questions,
    };
    const res = await QuizService.set(data);
    if (res.status === 202) {
      const state = {
        open: true,
        message: res.data,
        type: "success",
      };
      navigate("/admin/quiz", { state });
    } else {
      alert("There is Some error ", JSON.stringify(res));
    }
    setLoading(false);
  };

  return (
    <>
      {/*Container */}
      <Box>
        {/* Header */}
        <LoadingSpinner loading={loading} />
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
                minDate={startDate}
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
              names={studentNames}
              studentNames={selectedStudents}
              setstudentNames={setSelectedStudents}
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
              <Button
                variant="contained"
                onClick={handleRandomQuestions}
                disabled={randomQuestionNumber.value <= 0}
              >
                Submit
              </Button>
            </Stack>
            <QuestionAdd questions={questions} setQuestions={setQuestions} />
            {/* <QuestionAdd sections={sections} setSections={setSections} /> */}
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default AddQuiz;
