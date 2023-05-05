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
import { QuizService, UserService } from "../../../services/ServerRequest";
import auth from "../../../auth/auth";
import axios from "axios";

function AIAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [driveLinkUrl, setDriveLinkUrl] = useState("");
  const [showRes, setShowRes] = useState(false);
  const [videoAnalyzationDataMouth, setVideoAnalyzationDataMouth] =
    useState(null);
  const [videoAnalyzationDataEye, setVideoAnalyzationDataEye] = useState(null);
  const [videoAnalyzationDataPhone, setVideoAnalyzationDataPhone] =
    useState(null);
  // const [videoAnalyzationData, setVideoAnalyzationData] = useState({})
  // const [playVideo, setPlatVideo] = useState(false);

  useEffect(() => {
    setLoading((prev) => !prev);
    const getData = async () => {
      const res = await UserRecordingService.get();

      const quiz = await QuizService.get();
      const userData = await UserService.find({ username: auth.username });
      const filteredTests = [];
      quiz.data.map((test) => {
        if (test.author._id == userData.data[0]._id)
          filteredTests.push(test._id);
      });
      console.log(filteredTests);

      const filteredResults = [];
      console.log(res.data[0].quiz_id._id);
      res.data.map((r) => {
        if (filteredTests.includes(r.quiz_id._id)) {
          filteredResults.push(r);
        }
      });
      console.log(filteredResults);

      const arr = filteredResults.map((item) => item.quiz_id);
      setQuizzes(arr);
      setResponse(filteredResults);
    };
    getData();
    setLoading((prev) => !prev);
  }, []);

  const handleQuizChange = async (e) => {
    setSelectedQuiz(e.target.value);
    const data = response.filter((item) => item.quiz_id._id === e.target.value);
    setStudents(data[0].students);
    setSelectedStudent("");
  };

  const handleStudentChange = async (e) => {
    const data = students.filter((item) => item.user_id._id === e.target.value);
    setSelectedStudent(e.target.value);
    setDriveLinkUrl(data[0].driveLink);
  };

  const getIdFromUrl = (url) => {
    let u = url.match(/[-\w]{25,}/);
    if (u) return u[0];
    return "";
  };

  // let d = driveLinkUrl
  let d = getIdFromUrl(driveLinkUrl);

  const getMouthData = async () => {
    return await axios.get(
      "http://127.0.0.1:5001/flask/" + d.split("/").slice(-1)
    );
  };
  const getEyeData = async () => {
    return await axios.get(
      "http://127.0.0.1:5002/flask/" + d.split("/").slice(-1)
    );
  };
  const getPhoneData = async () => {
    return await axios.get(
      "http://127.0.0.1:5003/flask/" + d.split("/").slice(-1)
    );
  };

  const getVideoAnalyzed = async () => {
    setLoading(true);
    console.log(d.split("/").slice(-1));

    const response = await Promise.all([
      getMouthData(),
      getEyeData(),
      getPhoneData(),
    ]);

    console.log(
      response[0].data,
      response[1].data,
      response[2].data,
      typeof response[0].data
    );
    if (
      Object.keys(response[0].data).includes("error") ||
      Object.keys(response[1].data).includes("error") ||
      Object.keys(response[2].data).includes("error")
    ) {
      setLoading(false);
      alert("There was some error Please try some time later");

      return;
    } else {
      setLoading(false);
      setVideoAnalyzationDataMouth(response[0].data);
      setVideoAnalyzationDataEye(response[1].data);
      setVideoAnalyzationDataPhone(response[2].data);
      setShowRes(true);
    }
    // setVideoAnalyzationDataMouth({
    //     "MouthOpen": []
    // })
    // setVideoAnalyzationDataEye({
    //     "Left": 0,
    //     "Right": 0,
    //     "Up": 1,
    //     "Total": 1,
    // })
    // setVideoAnalyzationDataPhone({
    //     "MoreThanOnePersonDetected": [],
    //     "NoPersonDetected": [
    //         6.784
    //     ],
    //     "PhoneDetected": [
    //         4.128,
    //         4.256,
    //         4.528,
    //         4.656,
    //         4.8,
    //         4.928,
    //         5.2
    //     ]
    // })
    // setShowRes(true)
  };

  const getListItem = (arr) => {
    let listItem;
    console.log(arr);

    if (arr.length != 0) {
      listItem = arr.map((occr, index) => (
        <div key={index} className="timestamp">
          at {occr} second
        </div>
      ));
    } else {
      listItem = "None";
    }
    console.log(listItem);
    return listItem;
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box></Box>
          <Typography variant="h6">Select Quiz and Student</Typography>
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
            <Button
              variant="contained"
              onClick={() => {
                getVideoAnalyzed();
              }}
            >
              Analyze
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ padding: 5 }} textAlign="center">
          <LoadingSpinner loading={loading} />
          <Box sx={{ padding: 5 }} textAlign="center">
            {!loading && driveLinkUrl !== "" && (
              <video
                controls
                id="Student-camera"
                style={{ width: "50vw" }}
                src={driveLinkUrl}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </Box>

          {showRes && (
            <div className="result">
              <table className="category">
                <tbody>
                  <tr>
                    <td className="category-title">
                      Times Candidate Looked away from Test
                      <br />
                    </td>
                    <td className="timestamp-container">
                      {videoAnalyzationDataEye["Total"]
                        ? videoAnalyzationDataEye["Total"]
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="category">
                <tbody>
                  <tr>
                    {console.log(
                      videoAnalyzationDataPhone["PhoneDetected"],
                      ">>>>>>>>>>>...."
                    )}
                    <td className="category-title">
                      Candidate Using Phone
                      <br /> (timestamps)
                    </td>
                    <td className="timestamp-container">
                      {getListItem(videoAnalyzationDataPhone["PhoneDetected"])}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="category">
                <tbody>
                  <tr>
                    <td className="category-title">
                      More Than One Person Detected
                      <br /> (timestamps)
                    </td>
                    <td className="timestamp-container">
                      {getListItem(
                        videoAnalyzationDataPhone["MoreThanOnePersonDetected"]
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="category">
                <tbody>
                  <tr>
                    <td className="category-title">
                      Candidate left the test
                      <br /> (timestamps)
                    </td>
                    <td className="timestamp-container">
                      {getListItem(
                        videoAnalyzationDataPhone["NoPersonDetected"]
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="category">
                <tbody>
                  <tr>
                    <td className="category-title">
                      Candidate Tried to Talk
                      <br />
                      (timestamps)
                    </td>
                    <td className="timestamp-container">
                      {getListItem(videoAnalyzationDataMouth["MouthOpen"])}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}

export default AIAnalyzer;
