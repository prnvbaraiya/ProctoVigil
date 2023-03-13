import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";

function QuizInstructions() {
  const location = useLocation();
  const id = location.state?.id;
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("");
  const [cameras, setCameras] = useState([]);
  const [isValid, setIsValid] = useState({
    hasCameraAndMicrophone: false,
    isCameraStart: false,
    isEntireScreenSharing: false,
  });
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPermission = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      stream.getTracks().forEach((track) => track.stop());
      await navigator.mediaDevices.enumerateDevices().then((devices) => {
        const cameras = devices.filter(
          (device) => device.kind === "videoinput"
        );
        const microphones = devices.filter(
          (device) => device.kind === "audioinput"
        );
        if (cameras.length > 0 && microphones.length > 0) {
          setIsValid({ ...isValid, hasCameraAndMicrophone: true });
        }
        setSelectedAudio(microphones[0].deviceId);
        setCameras(cameras);
      });
    };
    getPermission();
  }, []);

  const handleCheckCamera = async () => {
    if (selectedCamera !== "") {
      const constraints = {
        video: { deviceId: selectedCamera },
        audio: true,
      };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsValid({ ...isValid, isCameraStart: true });
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    }
  };

  const handleScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { deviceId: selectedCamera },
        audio: true,
      });
      const tracks = stream.getTracks();
      if (tracks.length > 0) {
        const track = tracks[0];
        const settings = track.getSettings();
        if (settings.displaySurface === "monitor") {
          setIsValid({ ...isValid, isEntireScreenSharing: true });
        } else {
          stream.getTracks().forEach((track) => track.stop());
          alert("Select Entire Screen");
        }
      }
    } catch (error) {
      console.error("Error accessing screen share.", error);
    }
  };

  const handleQuizStart = () => {
    if (!isValid.hasCameraAndMicrophone) {
      alert("You havn't Give camera");
      return;
    } else if (!isValid.isCameraStart) {
      alert("Please select camera");
      return;
    }
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    const state = {
      id: id,
      InputDeviceIds: {
        camera: selectedCamera,
        audio: selectedAudio,
      },
    };
    navigate("/quiz/start", { state });
  };

  const isStepComplete = (res) => {
    return res ? (
      <CheckCircleIcon color="secondary" />
    ) : (
      <CancelIcon color="error" />
    );
  };

  return (
    <div>
      <Box m={5}>
        <Paper sx={{ minHeight: "85vh" }}>
          <Typography variant="h3" textAlign="center">
            Its Instructions Page
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Stack spacing={3}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {isStepComplete(isValid.hasCameraAndMicrophone)}
                  {"1) Device must have microphone and camera."}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {isStepComplete(isValid.isCameraStart)}

                    {"2) Check Your Camera"}
                  </div>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Camera
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedCamera}
                      label="Cameras"
                      onChange={(e) => setSelectedCamera(e.target.value)}
                    >
                      {cameras &&
                        cameras.map((item) => {
                          return (
                            <MenuItem key={item.deviceId} value={item.deviceId}>
                              {item.label}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <Button variant="contained" onClick={handleCheckCamera}>
                    Check Camera
                  </Button>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    {isStepComplete(isValid.isEntireScreenSharing)}
                    {"3) Screen Share"}
                  </div>
                  <Button variant="contained" onClick={handleScreenShare}>
                    Screen Share
                  </Button>
                </div>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <center>
                <Typography>Preview</Typography>
                <video
                  ref={videoRef}
                  style={{
                    width: "300px",
                    height: "225px",
                    borderRadius: "10px",
                    border: "1px solid black",
                  }}
                  autoPlay
                  muted
                />
              </center>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "15px 0",
            }}
          >
            <Button
              component={Link}
              onClick={() =>
                videoRef.current.srcObject
                  .getTracks()
                  .forEach((track) => track.stop())
              }
              to="/quiz"
              color="error"
              variant="contained"
            >
              Back
            </Button>
            <Button variant="contained" onClick={handleQuizStart}>
              Start
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default QuizInstructions;
