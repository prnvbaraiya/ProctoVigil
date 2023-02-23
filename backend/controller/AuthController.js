const { generateToken04 } = require("../zgocloud/zegoServerAssistant.js");
const QuizModel = require("../model/QuizModel.js");
const { PythonShell } = require("python-shell");
const jwt = require("jsonwebtoken");

const ERROR_CODE = 500;
const SUCCESS_CODE = 202;

const JWT = {
  generateToken: (email, roles) => {
    const payload = { email, roles };
    const token = jwt.sign(payload, process.env.JWT_SEC_KEY);
    return token;
  },
  verifyToken: (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SEC_KEY);
    return decoded;
  },
};

const User = {
  register: async (req, res) => {
    console.log("lol");
    return res.send("YAY");
  },
  login: async (req, res) => {
    const roles = "admin";
    const accessToken = JWT.generateToken(req.body.email, roles);
    return res.status(SUCCESS_CODE).send({ accessToken, roles });
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
    return res.status(SUCCESS_CODE).send(token);
  },
};

const Quiz = {
  add: async (req, res) => {
    const data = req.body;
    try {
      await QuizModel.create(data);
      return res.status(SUCCESS_CODE).send("Quiz Added");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  get: async (req, res) => {
    try {
      const quizzes = await QuizModel.find();
      return res.status(SUCCESS_CODE).send(quizzes);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const quiz = await QuizModel.findById(id);
      return res.status(SUCCESS_CODE).send(quiz);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;
      await QuizModel.findByIdAndUpdate(id, data);
      return res.status(SUCCESS_CODE).send("Quiz Updated");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      await QuizModel.findByIdAndDelete(id);
      return res
        .status(SUCCESS_CODE)
        .send({ message: "Quiz Deleted", type: "success" });
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
};

const a = {
  sc: async (req, res) => {
    // return res.status(201).send("YAY PRabac");
    console.log("start");
    PythonShell.run(
      "D:/study/Sem-8/4IT33/practical/procto-vigil/backend/controller/python_test.py",
      null
    ).then((messages) => {
      console.log(messages);
      return res.status(201).send(messages);
    });
    console.log("End");
  },
  test: async (req, res) => {
    return res.status(SUCCESS_CODE).send("Testing");
  },
};

function requireAdmin(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, secret);

  if (decoded.role !== "admin") {
    return res
      .status(403)
      .json({ error: "You do not have permission to access this resource." });
  }

  next();
}

// app.get('/admin', requireAuth, requireAdmin, (req, res) => {
//   // Render the admin page
// });

module.exports = { User, ZegocloudTokenGenerator, Quiz, a, requireAdmin };
