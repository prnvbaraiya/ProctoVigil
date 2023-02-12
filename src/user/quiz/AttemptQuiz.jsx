import React, { useEffect } from "react";
import { zegoInstance } from "../../config/ZegoConfig";
import ExamLayout from "../ExamLayout";
import DraggableLocalStream from "../../components/DraggableLocalStream";
import axios from "axios";
import { AUTH_API } from "../../variables/constants";

function AttemptQuiz() {
  const zconf = {
    roomId: "345",
    userId: "prnv",
    token: "",
    userName: "Pranav",
  };
  const instance = zegoInstance();

  useEffect(() => {
    createRoom();
    // eslint-disable-next-line
  }, []);

  const createRoom = async () => {
    await axios
      .post(AUTH_API + "generateToken", {
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
      <ExamLayout>
        <div>
          <div>Here User will Give Quiz</div>
          <DraggableLocalStream></DraggableLocalStream>
        </div>
      </ExamLayout>
    </>
  );
}

export default AttemptQuiz;
