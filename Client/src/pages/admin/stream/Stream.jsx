import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizService } from "../../../services/ServerRequest";

function Stream() {
  const [result, setResult] = useState("");
  const [quizLabel, setQuizLabel] = React.useState([]);
  const [quiz, setQuiz] = React.useState("");
  const [quizId, setQuizId] = React.useState("");
  const [studentLabel, setStudentLabel] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = { roomId: quizId, students };
    navigate("view", { state: data });
  };

  const getData = async () => {
    const res = await QuizService.get();
    setResult(res.data);
    setQuizLabel(res.data.map((item) => item.name));
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStudents(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box></Box>
        <Typography variant="h6">Select Students</Typography>
        <Box></Box>
      </Box>
      <form>
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quiz</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quiz}
              label="Quiz"
              onChange={(e) => {
                setQuiz(e.target.value);
                result.map((item) => {
                  if (item.name === e.target.value) {
                    setQuizId(item._id);
                    setStudentLabel(
                      item.studentNames.map((item) => item.username)
                    );
                  }
                });
              }}
            >
              {quizLabel &&
                quizLabel.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Student</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={students}
              multiple
              label="Student"
              onChange={handleChange}
            >
              {studentLabel &&
                studentLabel.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Stream;
