import React, { useEffect } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import { zegoInstance } from "../config/ZegoConfig";
import { SERVER_LINK } from "../variables/constants";

function DraggableLocalStream() {
  const zconf = {
    roomId: "678",
    userId: "prnv",
    token: "",
    userName: "Pranav",
  };
  const instance = zegoInstance();

  useEffect(() => {
    if (Boolean(process.env.REACT_APP_START_ZCLOUD)) createRoom();
    window.addEventListener("beforeunload", () => {
      instance.logoutRoom(zconf.roomId);
    });
    // eslint-disable-next-line
  }, []);

  const createRoom = async () => {
    await axios
      .post(SERVER_LINK + "generateToken", {
        userId: zconf.userId,
      })
      .then((res) => (zconf.token = res.data))
      .catch((err) => console.log("Error ", err));
    const deviceInfo = await instance.enumDevices();
    try {
      await instance.loginRoom(zconf.roomId, zconf.token, {
        userID: zconf.userId,
        userName: zconf.userName,
      });
    } catch (err) {
      console.log("Create Room Err: ", err);
    }
    const localStream = await instance.createStream({
      camera: {
        audioInput: deviceInfo.microphones[0].deviceID,
        videoInput: deviceInfo.cameras[1].deviceID,
        video: true,
        audio: true,
      },
    });

    const localView = instance.createLocalStreamView(localStream);
    instance.startPublishingStream(
      new Date().getTime().toString(),
      localStream,
      { videoCodec: "VP8" }
    );

    localView.play("local-stream");

    instance.on(
      "roomStreamUpdate",
      async (roomID, updateType, streamList, extendedData) => {
        console.log("Update:", updateType);
      }
    );
  };

  return (
    <>
      <Draggable bounds="parent" defaultPosition={{ x: 30 }}>
        <div
          id="local-stream"
          style={{
            width: "250px",
            height: "170px",
            border: "2px solid black",
          }}
        ></div>
      </Draggable>
    </>
  );
}

export default DraggableLocalStream;
