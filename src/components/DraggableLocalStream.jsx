import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import axios from "axios";

import { SERVER_LINK } from "../variables/constants";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function DraggableLocalStream({ instance }) {
  const zconf = {
    roomId: "111",
    userId: "prnv",
    token: "",
    userName: "Pranav",
  };

  const navigate = useNavigate();
  let localStream = null;
  let localView = null;
  const streamId = new Date().getTime().toString();

  useEffect(() => {
    if (Boolean(process.env.REACT_APP_START_ZCLOUD)) createRoom();
    window.addEventListener("beforeunload", () => {
      instance.logoutRoom(zconf.roomId);
    });

    return () => {
      if (instance) {
        instance.enableVideoCaptureDevice(localStream, false);
        instance.logoutRoom(zconf.roomId);
      }
    };
    // eslint-disable-next-line
  }, []);

  const createRoom = async () => {
    try {
      const { data } = await axios.post(SERVER_LINK + "generateToken", {
        userId: zconf.userId,
      });
      zconf.token = data;

      const deviceInfo = await instance.enumDevices();
      console.log("DeviceP:", deviceInfo);
      if (deviceInfo.microphones.length === 0) {
        alert("Microphone Not Found");
        navigate("/quiz");
      } else if (deviceInfo.cameras.length === 0) {
        alert("Camera Not Found");
        navigate("/quiz");
      } else {
        await instance.loginRoom(zconf.roomId, zconf.token, {
          userID: zconf.userId,
          userName: zconf.userName,
        });

        localStream = await instance.createStream({
          camera: {
            audioInput: deviceInfo.microphones[0].deviceID,
            videoInput: deviceInfo.cameras[1].deviceID,
            video: true,
            audio: true,
          },
        });

        localView = instance.createLocalStreamView(localStream);
        instance.startPublishingStream(streamId, localStream, {
          videoCodec: "VP8",
        });

        localView.play("local-stream");

        instance.on(
          "roomStreamUpdate",
          async (roomID, updateType, streamList, extendedData) => {
            console.log("Update:", updateType);
          }
        );
      }
      console.log("Tmp:", localStream);
    } catch (err) {
      console.log("Create Room Err: ", err);
    }
  };

  const handleLogout = async () => {
    try {
      navigate("/quiz");
    } catch (err) {
      console.log("Logout Error: ", err);
    }
  };

  return (
    <>
      <Draggable bounds="parent" defaultPosition={{ x: 30 }}>
        <>
          <div
            id="local-stream"
            style={{
              width: "250px",
              height: "170px",
              border: "2px solid black",
            }}
          ></div>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      </Draggable>
    </>
  );
}

export default DraggableLocalStream;
