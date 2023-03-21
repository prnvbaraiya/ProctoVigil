import { Box, Stack, Button, Divider, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getRandomQuestions } from "../../../common/Methods";
import DateTime from "../../../components/form/DateTime";
import QuestionAdd from "../../../components/form/QuestionAdd";
import SelectChip from "../../../components/form/SelectChip";
import TextBox from "../../../components/form/TextBox";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useFormInput } from "../../../hooks/useFormInput";
import { QuizService, UserService } from "../../../services/ServerRequest";

function EditQuiz() {
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();
  const { id } = location.state;
  const randomQuestionNumber = useFormInput("");
  const [studentNames, setStudentNames] = useState([]);
  const author = useFormInput("");
  const name = useFormInput("");
  const description = useFormInput("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const duration = useFormInput("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [questions, setQuestions] = useState([
    {
      type: "multiple",
      question: "",
      options: [{ text: "", isCorrect: false }],
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await UserService.getStudents();
      setStudentNames(res.data.map((item) => item.username));
    };
    getData();
    setLoading(false);
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await QuizService.getById(id);
      author.onChange(
        res.data.author.firstName + " " + res.data.author.lastName
      );
      name.onChange(res.data.name);
      description.onChange(res.data.description);
      setStartDate(res.data.startDate);
      setEndDate(res.data.endDate);
      duration.onChange(res.data.duration);
      setSelectedStudents(res.data.studentNames);
      setQuestions(res.data.questions);
      setLoading(false);
    };
    getData();
    // eslint-disable-next-line
  }, [id]);

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
      _id: id,
      name: name.value,
      description: description.value,
      startDate: startDate,
      endDate: endDate,
      duration: duration.value,
      studentNames: selectedStudents,
      questions,
    };
    const res = await QuizService.update(data);
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
      <>
        {" "}
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
            <Typography variant="h6">Update Quiz</Typography>
            <Button
              color="secondary"
              onClick={handleSubmit}
              variant="contained"
            >
              Update
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
                <Button variant="contained" onClick={handleRandomQuestions}>
                  Submit
                </Button>
              </Stack>
              <QuestionAdd questions={questions} setQuestions={setQuestions} />
            </Stack>
          </form>
        </Box>
      </>
    </>
  );
}

export default EditQuiz;
