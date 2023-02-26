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

function Test() {
  const [selectedCamera, setSelectedCamera] = useState();
  const [cameras, setCameras] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === "videoinput");
      setCameras(cameras);
    });
  }, []);

  const handleCameraChange = async (event) => {
    const selectedDeviceId = event.target.value;
    const constraints = {
      video: { deviceId: selectedDeviceId },
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  return (
    <div>
      <Box m={5}>
        <Paper>
          <Typography variant="h3" textAlign="center">
            Its Instriction Page
          </Typography>
          <Grid container>
            <Grid item xs={8}>
              1) Don't Try to cheat
              <br /> 2) Check Your Camera
              <br />
              <FormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCamera}
                  label="Cameras"
                  onChange={(e) => {
                    setSelectedCamera(e.target.value);
                    setSelectedDeviceId(
                      cameras.filter((item) => item.label === e.target.value)[0]
                        .deviceId
                    );
                  }}
                >
                  {cameras &&
                    cameras.map((item) => {
                      return (
                        <MenuItem key={item.deviceId} value={item.label}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <Button variant="contained">Check Camera</Button>
            </Grid>
            <Grid item xs={4}>
              {/* {mediaStream ? (
                <div>
                  <video autoPlay ref={videoRef} />
                  <button onClick={handleStopClick}>Stop</button>
                </div>
              ) : (
                <button onClick={handleStartClick}>Start</button>
              )} */}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default Test;
