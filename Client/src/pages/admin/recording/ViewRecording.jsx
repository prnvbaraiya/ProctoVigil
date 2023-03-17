import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AlertDialogBox from "../../../components/AlertDialogBox";
import LoadingSpinner from "../../../components/LoadingSpinner";
import SnackbarDisplay from "../../../components/SnackbarDisplay";
import { useFormInput } from "../../../hooks/useFormInput";
import {
  QuizResultService,
  UserRecordingService,
} from "../../../services/ServerRequest";

function ViewRecording() {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [response, setResponse] = useState();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [filePath, setFilePath] = useState("");
  const [deleteDialogBox, setDeleteDialogBox] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    type: "success",
    vertical: "top",
    horizontal: "right",
  });

  useEffect(() => {
    setLoading((prev) => !prev);
    const getData = async () => {
      const res = await UserRecordingService.get();
      const arr = res.data.map((item) => item.quiz_id);
      setQuizzes(arr);
      setResponse(res.data);
    };
    getData();
    setLoading((prev) => !prev);
  }, []);

  const handleGetStudent = async () => {
    const res = await UserRecordingService.getFile({
      filePath,
    });
    const blob = new Blob([res.data], { type: "video/webm;codecs=vp9" });
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
    console.log(blob);
  };

  const handleQuizChange = async (e) => {
    setSelectedQuiz(e.target.value);
    const data = response.filter((item) => item.quiz_id._id === e.target.value);

    setStudents(data[0].students);
  };

  const handleStudentChange = async (e) => {
    const data = students.filter((item) => item.user_id._id === e.target.value);
    setSelectedStudent(e.target.value);
    setFilePath(data[0].filePath);
  };

  return (
    <>
      <Box>
        <AlertDialogBox
          open={deleteDialogBox}
          setOpen={setDeleteDialogBox}
          handleSuccess={() => handleDelete(deleteId)}
          title="Are you sure you want to delete"
          data="Deleting User's Response It is ireversible ?"
        />
        <LoadingSpinner loading={loading} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box></Box>
          <Typography variant="h6">Recordings</Typography>
          <Box></Box>
        </Box>
        <Divider sx={{ margin: "10px 0 20px" }} />
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Quiz</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Quiz"
                onChange={handleQuizChange}
                value={selectedQuiz}
              >
                {quizzes.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Student</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Student"
                onChange={handleStudentChange}
                value={selectedStudent}
              >
                {students.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item.user_id._id}>
                      {item.user_id.username}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleGetStudent}>
              Get Student
            </Button>
          </Grid>
        </Grid>
        <Box textAlign="center">
          {!loading && selectedQuiz.value !== "" && (
            <video controls src={videoUrl}>
              Your browser does not support the video tag.
            </video>
          )}
        </Box>
        <SnackbarDisplay
          snackbarData={snackbarData}
          setSnackbarData={setSnackbarData}
        />
      </Box>
    </>
  );
}

export default ViewRecording;
