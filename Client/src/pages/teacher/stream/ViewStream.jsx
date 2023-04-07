import React, { useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { zegoInstance } from "../../../config/ZegoConfig";
import { JWTService } from "../../../services/ServerRequest";
import auth from "../../../auth/auth";

function ViewStream() {
  const location = useLocation();
  const data = location.state;
  const zconf = {
    roomId: data.roomId,
    token: "",
    userId: auth.username,
    userName: auth.username,
  };

  const instance = zegoInstance();

  useEffect(() => {
    createRoom();
    instance.on("roomStreamUpdate", async (roomID, updateType, streamList) => {
      //async (roomID, updateType, streamList, _extendedData) => {
      if (updateType === "ADD") {
        streamList.map(async (item) => {
          if (data.students.includes(item.user.userID)) {
            const streamID = item.streamID;

            const remoteStream = await instance.startPlayingStream(streamID);
            const remoteView = instance.createRemoteStreamView(remoteStream);
            document.getElementById(streamID).innerHTML = "";

            remoteView.play(streamID, {
              enableAutoplayDialog: true,
            });
          }
        });
      } else {
        streamList.map(async (item) => {
          document.getElementById(
            item.streamID
          ).innerHTML = `<center>${item.user.userName} Is Already Leave</center>`;
        });
      }
    });
    return () => {
      if (instance) {
        instance.logoutRoom(zconf.roomId);
      }
    };
    // eslint-disable-next-line
  }, []);

  const createRoom = async () => {
    const res = await JWTService.generateToken({
      userId: zconf.userId,
    });
    zconf.token = res.data;

    try {
      await instance.loginRoom(zconf.roomId, zconf.token, {
        userID: zconf.userId,
        userName: zconf.userName,
      });
    } catch (err) {
      alert("Create Room Err: ", JSON.stringify(err));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="..">
          <Button color="error" variant="contained">
            Back
          </Button>
        </Link>
        <Typography variant="h6">View Stream</Typography>
        <Box></Box>
      </Box>
      <Grid container spacing={2}>
        {data.students.map((item) => {
          return (
            <React.Fragment key={item}>
              <Grid item xs={12} lg={6}>
                <center>
                  <h1>{item} Camera</h1>
                </center>
                <div
                  key={item}
                  style={{ height: "50vh" }}
                  id={`${item}-camera`}
                >
                  <center>{item} is Not Joined Yet</center>
                </div>
              </Grid>
              <Grid item xs={12} lg={6}>
                <center>
                  <h1>{item} Screen</h1>
                </center>
                <div
                  key={item}
                  style={{ height: "50vh" }}
                  id={`${item}-screen`}
                >
                  <center>{item} is Not Joined Yet</center>
                </div>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
}

export default ViewStream;
