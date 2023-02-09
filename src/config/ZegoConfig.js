import { ZegoExpressEngine } from "zego-express-engine-webrtc";

export const zegoInstance = () => {
  return new ZegoExpressEngine(
    Number(process.env.REACT_APP_ZCLOUD_APPID),
    process.env.REACT_APP_ZCLOUD_SERVER
  );
};
