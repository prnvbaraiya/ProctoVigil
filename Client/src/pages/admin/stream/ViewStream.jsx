import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { zegoInstance } from "../../../config/ZegoConfig";
import { JWTService } from "../../../services/ServerRequest";
import auth from "../../../auth/auth";

function ViewStream() {
  const location = useLocation();
  const data = location.state;
  const zconf = {
    roomId: data.roomId,
    token: "",
    userId: auth.name,
    userName: auth.name,
  };

  const instance = zegoInstance();

  useEffect(() => {
    createRoom();
    instance.on(
      "roomStreamUpdate",
      async (roomID, updateType, streamList, extendedData) => {
        if (updateType === "ADD") {
          streamList.map(async (item) => {
            if (data.students.includes(item.user.userID)) {
              const streamID = item.streamID;

              const remoteStream = await instance.startPlayingStream(streamID);
              const remoteView = instance.createRemoteStreamView(remoteStream);

              remoteView.play("remote-stream-" + item.user.userID, {
                enableAutoplayDialog: true,
              });
            }
          });
        }
      }
    );
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
      <Grid container spacing={2}>
        {data.students.map((item) => {
          return (
            <>
              <Grid item xs={6}>
                <center>
                  <h1>{item}</h1>
                </center>
                <div
                  key={item}
                  style={{ height: "50vh" }}
                  id={`remote-stream-${item}`}
                />
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}

export default ViewStream;
