import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import { zegoInstance } from "../../config/ZegoConfig";

function ViewStream() {
  const location = useLocation();
  const data = location.state;
  const zconf = {
    roomId: "345",
    token: `04AAAAAGPp7iYAEGFxY3gwZnNicmg0dW9jMXMAoNoC35zzArMYM7ZRtEtsSLY9juyBVR6NZdAFzbingqt0Orhv80Iu8J2P4b1uSOAnhvPsongngNqVyo8vk7n0RPNWMqoWne35yHTKio2OfvbAFEAvTeMnDMj+7kwnbnOanF9jgFUQT6wmqMHupy6H6kkecAJLi+v28qfPhO5pDlSDZ+vFetcIkl5Fhfg1Axw3A0w79r6drAJQTcA/imly4m0=`,
    userId: "admin",
    userName: "admin",
  };

  const instance = zegoInstance();

  useEffect(() => {
    createRoom();
    // eslint-disable-next-line
  }, []);

  const createRoom = async () => {
    try {
      await instance.loginRoom(zconf.roomId, zconf.token, {
        userID: zconf.userId,
        userName: zconf.userName,
      });
    } catch (err) {
      console.log("Create Room Err: ", err);
    }

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
  };

  return (
    <AdminLayout>
      <Box align="center">
        <Typography variant="h3">View {data.student}</Typography>
        <div style={{ width: "60vw", height: "60vh" }} id="remote-stream"></div>
      </Box>
    </AdminLayout>
  );
}

export default ViewStream;
