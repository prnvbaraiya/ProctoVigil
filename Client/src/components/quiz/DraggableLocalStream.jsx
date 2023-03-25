import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { JWTService } from "../../services/ServerRequest";

function DraggableLocalStream({
  InputDeviceIds,
  instance,
  zConfig,
  entireScreenStream,
  downloadVideo,
}) {
  let localStream = null;
  let localScreenStream = null;
  const streamId = zConfig.userName + "-camera";
  const screenStreamId = zConfig.userName + "-screen";
  const videoRef = useRef();

  useEffect(() => {
    createRoom(instance, zConfig, "local-stream");
    return () => {
      handleLogout();
    };
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    if (instance) {
      instance.stopPublishingStream(streamId);
      instance.destroyStream(localStream);
      instance.stopPublishingStream(screenStreamId);
      instance.destroyStream(localScreenStream);
      instance.logoutRoom(zConfig.roomId);
    }
  };

  const createRoom = async (zCloudObj, config) => {
    try {
      const { data } = await JWTService.generateToken({
        userId: config.userId,
      });
      config.token = data;

      await zCloudObj.loginRoom(config.roomId, config.token, {
        userID: config.userId,
        userName: config.userName,
      });

      localStream = await zCloudObj.createStream({
        camera: {
          audioInput: InputDeviceIds.audio,
          videoInput: InputDeviceIds.camera,
          video: true,
          audio: true,
        },
      });
      localScreenStream = await zCloudObj.createStream({
        custom: {
          source: entireScreenStream,
        },
      });

      const cameraChunks = [];

      const mediaRecorder = new MediaRecorder(localStream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          cameraChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(cameraChunks, {
          type: "video/webm;codecs=vp9",
        });
        downloadVideo(videoBlob, `${config.userName}.mkv`);
      };

      mediaRecorder.start();

      zCloudObj.startPublishingStream(streamId, localStream);
      zCloudObj.startPublishingStream(screenStreamId, localScreenStream);

      videoRef.current.srcObject = localStream;
    } catch (err) {
      console.log("PrnvError:", err);
      alert("Error in createRoom: ", JSON.stringify(err));
    }
  };

  return (
    <>
      <Draggable bounds="parent" defaultPosition={{ x: 30 }}>
        <>
          <video
            ref={videoRef}
            style={{
              width: "250px",
              height: "170px",
              border: "2px solid black",
            }}
            autoPlay
            muted
          ></video>
        </>
      </Draggable>
    </>
  );
}

export default DraggableLocalStream;
