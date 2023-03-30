import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import { useLocation } from "react-router-dom";
import auth from "../../../auth/auth";
import Logo from "../../../assets/logo.png";

function StartInterview() {
  const location = useLocation();
  const roomID = location.state?.id;
  const isAdmin = auth.roles === "admin";

  const config = {
    scenario: {
      mode: ZegoUIKitPrebuilt.VideoConference,
    },
    branding: {
      logoURL: Logo,
    },
    showRoomTimer: true,
  };

  if (isAdmin) {
    config.turnOnMicrophoneWhenJoining = false;
    config.turnOnCameraWhenJoining = false;
    config.showTurnOffRemoteMicrophoneButton = true;
    config.showTurnOffRemoteCameraButton = true;
    config.showRemoveUserButton = true;
  } else {
    config.showPreJoinView = false;
    config.showUserList = false;
    config.showRoomDetailsButton = false;
    config.whiteboardConfig = {
      showAddImageButton: false,
      showCreateAndCloseButton: false,
    };
  }

  let myInterview = async (element) => {
    const appID = Number(import.meta.env.VITE_ZCLOUD_APPID);
    const serverSecret = import.meta.env.VITE_ZCLOUD_SERVER;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      auth.username,
      auth.username
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.addPlugins({ ZegoSuperBoardManager });
    zp.joinRoom({ ...config, container: element });
  };

  return (
    <div
      className="myCallContainer"
      ref={myInterview}
      style={{ height: "100vh" }}
    ></div>
  );
}

export default StartInterview;
