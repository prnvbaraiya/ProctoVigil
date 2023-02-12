import React, { useEffect } from "react";
import { zegoInstance } from "../../config/ZegoConfig";
import DraggableLocalStream from "../../components/DraggableLocalStream";

function AttemptQuiz() {
  const zconf = {
    roomId: "345",
    token: `04AAAAAGPp7goAEDVhd2E5b291bXBwa2trNW8AoOIdc+gMDrWzeprFOWV3G3yLHoXKuGCjSdhcccru0gjDB39kcVedsisgJAQTv1ZJyuTFNk7hqiWYzRIWR6PzTMamJ8FnELjv1opXvKt0kfNAvEn1k+CJOfeauFiFpmI1Vztm/5n8Ho5jH4zA4V2Q58T+v9iZFbfNXSrRcMiqs/HqcECSNBoQMDEeN08HDYrMvU7UpK0fNucieTS7hmE2mLE=`,
    userId: "user1",
    userName: "user 1",
  };
  const instance = zegoInstance();

  useEffect(() => {
    createRoom();
    // eslint-disable-next-line
  }, []);

  const createRoom = async () => {
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
  };

  return (
    <>
      <div style={{ width: "98vw", height: "98vh" }}>
        <div>Here User will Give Quiz</div>
        <DraggableLocalStream></DraggableLocalStream>
      </div>
    </>
  );
}

export default AttemptQuiz;
