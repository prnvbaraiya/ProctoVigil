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
import { LoadingSpinner } from "../../../components/index";
import { UserRecordingService } from "../../../services/ServerRequest";

function ViewRecording() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [driveLinkUrl, setDriveLinkUrl] = useState("");
  const [playVideo, setPlatVideo] = useState(false);

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

  const handleQuizChange = async (e) => {
    setPlatVideo(false);
    setSelectedQuiz(e.target.value);
    const data = response.filter((item) => item.quiz_id._id === e.target.value);
    setStudents(data[0].students);
    setSelectedStudent("");
  };

  const handleStudentChange = async (e) => {
    setPlatVideo(false);
    const data = students.filter((item) => item.user_id._id === e.target.value);
    setSelectedStudent(e.target.value);
    setDriveLinkUrl(data[0].driveLink);
  };

  return (
    <>
      <Box>
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
            <Button variant="contained" onClick={() => setPlatVideo(true)}>
              Get Student
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ padding: 5 }} textAlign="center">
          {!loading && driveLinkUrl !== "" && (
            <video
              controls
              hidden={!playVideo}
              id="Student-camera"
              style={{ width: "50vw" }}
              src={driveLinkUrl}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ViewRecording;
