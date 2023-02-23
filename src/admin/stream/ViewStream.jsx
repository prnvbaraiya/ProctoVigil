import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import { zegoInstance } from "../../config/ZegoConfig";
import axios from "axios";
import { SERVER_LINK } from "../../variables/constants";

function ViewStream() {
  const location = useLocation();
  const data = location.state;
  const zconf = {
    roomId: "678",
    token: "",
    userId: "admin",
    userName: "admin",
  };

  const instance = zegoInstance();

  useEffect(() => {
    createRoom();
    instance.on(
      "roomStreamUpdate",
      async (roomID, updateType, streamList, extendedData) => {
        if (updateType === "ADD") {
          const streamID = streamList[0].streamID;
          const remoteStream = await instance.startPlayingStream(streamID);

          const remoteView = instance.createRemoteStreamView(remoteStream);
          remoteView.play("remote-stream", { enableAutoplayDialog: true });
        } else if (updateType === "DELETE") {
          const streamID = streamList[0].streamID;
          instance.stopPlayingStream(streamID);
        }
      }
    );
    // eslint-disable-next-line
  }, []);

  const createRoom = async () => {
    await axios
      .post(SERVER_LINK + "generateToken", {
        userId: zconf.userId,
      })
      .then((res) => (zconf.token = res.data))
      .catch((err) => console.log("Error ", err));

    try {
      await instance.loginRoom(zconf.roomId, zconf.token, {
        userID: zconf.userId,
        userName: zconf.userName,
      });
    } catch (err) {
      console.log("Create Room Err: ", err);
    }
  };

  return (
    <>
      <Box align="center">
        <Typography variant="h3">View {data.student}</Typography>
        <div style={{ width: "60vw", height: "60vh" }} id="remote-stream"></div>
      </Box>
    </>
  );
}

export default ViewStream;
