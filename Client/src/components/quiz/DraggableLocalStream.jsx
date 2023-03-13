import React, { useEffect } from "react";
import Draggable from "react-draggable";
import { JWTService } from "../../services/ServerRequest";

function DraggableLocalStream({ InputDeviceIds, instance, zConfig }) {
  let localStream = null;
  let localView = null;
  const streamId = new Date().getTime().toString();

  useEffect(() => {
    createRoom();
    return () => {
      handleLogout();
    };
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    console.log("PrnvIns:", instance);
    console.log("Prnvls:", localStream);
    if (instance) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      instance.logoutRoom(zConfig.roomId);
    }
  };

  const createRoom = async () => {
    try {
      const { data } = await JWTService.generateToken({
        userId: zConfig.userId,
      });
      zConfig.token = data;

      await instance.loginRoom(zConfig.roomId, zConfig.token, {
        userID: zConfig.userId,
        userName: zConfig.userName,
      });

      localStream = await instance.createStream({
        camera: {
          audioInput: InputDeviceIds.audio,
          videoInput: InputDeviceIds.camera,
          video: true,
          audio: true,
        },
      });

      localView = instance.createLocalStreamView(localStream);
      instance.startPublishingStream(streamId, localStream, {
        videoCodec: "VP8",
      });

      localView.play("local-stream");
    } catch (err) {
      console.log("PrnvError:", err);
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
