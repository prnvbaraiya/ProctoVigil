import React, { useEffect, useRef } from "react";
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
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
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
      //Permission
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          localStream = stream;
        });
      //endPermission
      const deviceInfo = await instance.enumDevices();
      if (
        deviceInfo.microphones.length === 0 ||
        deviceInfo.microphones[0].deviceID === ""
      ) {
        alert("Microphone Not Found");
        navigate("/");
      } else if (
        deviceInfo.cameras.length === 0 ||
        deviceInfo.cameras[1].deviceID === ""
      ) {
        alert("Camera Not Found");
        navigate("/");
      } else {
        await instance.loginRoom(zConfig.roomId, zConfig.token, {
          userID: zConfig.userId,
          userName: zConfig.userName,
        });

        localStream = await instance.createStream({
          camera: {
            audioInput: deviceInfo.microphones[0].deviceID,
            videoInput: deviceInfo.cameras[0].deviceID, //PrnvChange
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
      console.log("Prnv:", err);
      alert("Error in createRoom: ", JSON.stringify(err));
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
