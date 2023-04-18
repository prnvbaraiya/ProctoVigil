const { generateToken04 } = require("../zgocloud/zegoServerAssistant.js");

const ZegocloudTokenGenerator = {
  getToken: async (req, res) => {
    const userId = req.body.userId;
    const effectiveTimeInSeconds = 36000;

    const token = generateToken04(
      Number(process.env.ZCLOUD_APPID),
      userId,
      `${process.env.ZCLOUD_SERVERSECRET}`,
      effectiveTimeInSeconds
    );
    return res.status(202).send(token);
  },
};

module.exports = { ZegocloudTokenGenerator };
