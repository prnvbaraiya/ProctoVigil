import React, { useEffect } from "react";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import { JWTService } from "../../services/ServerRequest";

function DraggableLocalStream({ instance, zConfig }) {
  const navigate = useNavigate();
  let localStream = null;
  let localView = null;
  const streamId = new Date().getTime().toString();

  useEffect(() => {
    createRoom();
    window.addEventListener("beforeunload", () => {
      instance.logoutRoom(zConfig.roomId);
    });

    return () => {
      if (instance) {
        instance.enableVideoCaptureDevice(localStream, false);
        instance.logoutRoom(zConfig.roomId);
      }
    };
    // eslint-disable-next-line
  }, []);

  const createRoom = async () => {
    try {
      const { data } = await JWTService.generateToken({
        userId: zConfig.userId,
      });
      zConfig.token = data;

      const deviceInfo = await instance.enumDevices();
      if (deviceInfo.microphones.length === 0) {
        alert("Microphone Not Found");
        navigate("/quiz");
      } else if (deviceInfo.cameras.length === 0) {
        alert("Camera Not Found");
        navigate("/quiz");
      } else {
        await instance.loginRoom(zConfig.roomId, zConfig.token, {
          userID: zConfig.userId,
          userName: zConfig.userName,
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
      }
    } catch (err) {
      alert("Error in createRoom: ", err);
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
        </>
      </Draggable>
    </>
  );
}

export default DraggableLocalStream;
