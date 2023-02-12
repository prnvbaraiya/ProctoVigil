import { generateToken04 } from "../zgocloud/zegoServerAssistant.js";

const User = {
  register: async (req, res) => {
    console.log("lol");
    return res.send("YAY");
  },
  login: async (req, res) => {
    console.log(req.body);
    return res.status(202).send("Success");
  },
};

const ZegocloudTokenGenerator = {
  getToken: async (req, res) => {
    console.log(process.env.ZCLOUD_APPID);
    const userId = req.body.userId;
    const effectiveTimeInSeconds = 5;
    const payloadObject = {
      room_id: "room1",
      privilege: {
        1: 1,
        2: 0,
      },
      stream_id_list: null,
    };
    const payload = JSON.stringify(payloadObject);
    // const token = null;

    const token = generateToken04(
      Number(process.env.ZCLOUD_APPID),
      userId,
      `${process.env.ZCLOUD_SERVERSECRET}`,
      effectiveTimeInSeconds,
      payload
    );
    return res.status(202).send(token);
  },
};
export { User, ZegocloudTokenGenerator };
