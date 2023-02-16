import { generateToken04 } from "../zgocloud/zegoServerAssistant.js";
import QuizModel from "../model/QuizModel.js";

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

const Quiz = {
  add: async (req, res) => {
    const data = req.body;
    try {
      const quiz = await QuizModel.create(data);
      return res.status(202).send("Quiz Added");
    } catch (err) {
      return res.status(500).send("There is some error: " + err);
    }
  },
  get: async (req, res) => {
    try {
      const quiz = await QuizModel.find();
      return res.status(202).send(quiz);
    } catch (err) {
      return res.status(500).send("There is some error: " + err);
    }
  },
};
export { User, ZegocloudTokenGenerator, Quiz };
