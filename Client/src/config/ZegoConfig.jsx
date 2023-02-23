import { ZegoExpressEngine } from "zego-express-engine-webrtc";

export const zegoInstance = () => {
  return new ZegoExpressEngine(
    Number(import.meta.env.VITE_ZCLOUD_APPID),
    import.meta.env.VITE_ZCLOUD_SERVER
  );
};
