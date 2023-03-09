const jwt = require("jsonwebtoken");
const express = require("express");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const viewPath = path.resolve(__dirname, "./../templates/views");
const { generateToken04 } = require("../zgocloud/zegoServerAssistant.js");
const UserModel = require("../model/UserModel.js");
const QuizModel = require("../model/QuizModel.js");
const QuizResultModel = require("../model/QuizResult");
const { PythonShell } = require("python-shell");

const ERROR_CODE = 500;
const SUCCESS_CODE = 202;

const JWT = {
  generateToken: (user) => {
    const payload = {
      roles: user.roles,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SEC_KEY);
    return token;
  },
  verifyToken: (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SEC_KEY);
    return decoded;
  },
  authenticateToken: (req, res, next) => {
    const token = req.headers["authorization"];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
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

const MailingSystem = {
  sendMail: (mailOption) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extName: ".hbs",
          defaultLayout: false,
          express,
        },
        viewPath,
        extName: ".hbs",
      })
    );

    const mailOptions = {
      from: '"Pranav from Proctovigil" <no-reply@proctovigil.com>',
      ...mailOption,
    };

    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log(info);
        return true;
      }
    });
  },
};

const User = {
  register: async (req, res) => {
    try {
      const user = await UserModel.create(req.body);
      MailingSystem.sendMail({
        to: user.email,
        subject: "Welcome To ProctoVigil",
        template: "welcome-mail",
        context: {
          name: user.firstName + " " + user.lastName,
        },
      });
      return res.status(SUCCESS_CODE).send("User Created Succesfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("Server Error: " + err);
    }
  },
  login: async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (
        user.email === req.body.email &&
        user.password === req.body.password
      ) {
        const accessToken = JWT.generateToken(user);
        return res
          .status(SUCCESS_CODE)
          .send({ accessToken, roles: user.roles });
      } else {
        return res.status(ERROR_CODE).send("Password Doesn't Match");
      }
    } else {
      return res.status(ERROR_CODE).send("User Not Found");
    }
  },
  get: async (req, res) => {
    try {
      const users = await UserModel.find();
      return res.status(SUCCESS_CODE).send(users);
    } catch (err) {
      return res.status(ERROR_CODE).send("User Getting Error: " + err);
    }
  },
  find: async (req, res) => {
    try {
      const user = await UserModel.find(req.body);
      return res.status(SUCCESS_CODE).send(user);
    } catch (err) {
      return res.status(ERROR_CODE).send("User Getting Error: " + err);
    }
  },
  getStudent: async (req, res) => {
    try {
      const users = await UserModel.find({ roles: "student" });
      return res.status(SUCCESS_CODE).send(users);
    } catch (err) {
      return res.status(ERROR_CODE).send("User Getting Error: " + err);
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      const tmp = await UserModel.findByIdAndUpdate(data._id, data);
      return res.status(SUCCESS_CODE).send("Updated Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("User Update Error: " + err);
    }
  },
  delete: async (req, res) => {
    try {
      const user = await UserModel.findOneAndRemove(req.body);
      const result = await QuizModel.deleteMany({ author: user._id });
      return res.status(SUCCESS_CODE).send("User Deleted Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("User Delted Error: " + err);
    }
  },
};

const Quiz = {
  add: async (req, res) => {
    const user = await UserModel.findOne({ username: req.body.author });
    const data = { ...req.body, author: user._id };
    try {
      await QuizModel.create(data);
      return res.status(SUCCESS_CODE).send("Quiz Added");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  get: async (req, res) => {
    try {
      // const quizzes = await QuizModel.find({ startDate: { $gt: Date.now() } })
      const quizzes = await QuizModel.find().sort({ name: 1 }).populate({
        path: "author",
        select: "firstName lastName",
      });
      return res.status(SUCCESS_CODE).send(quizzes);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const quiz = await QuizModel.findById(id).populate({
        path: "author",
        select: "firstName lastName",
      });
      return res.status(SUCCESS_CODE).send(quiz);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      await QuizModel.findByIdAndUpdate(data._id, data);
      return res.status(SUCCESS_CODE).send("Quiz Updated");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  delete: async (req, res) => {
    try {
      const data = await QuizModel.findByIdAndDelete(req.body.id);
      return res
        .status(SUCCESS_CODE)
        .send({ message: "Quiz Deleted", type: "success" });
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
};

const QuizResult = {
  add: async (req, res) => {
    const { QuizId, totalMarks, students } = req.body;

    // Find the quiz result document by QuizId
    let quizResult = await QuizResultModel.findOne({ QuizId });

    // If the document does not exist, create a new one
    if (!quizResult) {
      quizResult = new QuizResultModel({ QuizId, totalMarks });
    }

    // Iterate through the students and add or update the quiz result
    const { username, answerKey, studentAnswer, obtainedMarks, warningCount } =
      students;

    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (user) {
      // Check if the student already has a quiz result in the document
      const existingStudent = quizResult.students.find(
        (s) => s.user.toString() === user._id.toString()
      );

      if (existingStudent) {
        // Update the existing quiz result
        existingStudent.answerKey = answerKey;
        existingStudent.studentAnswer = studentAnswer;
        existingStudent.obtainedMarks = obtainedMarks;
        existingStudent.warningCount = warningCount;
      } else {
        // Add a new quiz result for the student
        quizResult.students.push({
          user: user._id,
          answerKey,
          studentAnswer,
          obtainedMarks,
          warningCount,
        });
      }
    }

    // Save the quiz result document
    await quizResult.save();

    res
      .status(SUCCESS_CODE)
      .send({ message: "Quiz result added successfully" });
  },
  get: async (req, res) => {
    try {
      const quizzes = await QuizResultModel.find().populate({
        path: "QuizId",
        select: "name",
      });
      return res.status(SUCCESS_CODE).send(quizzes);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const quiz = await QuizResultModel.findOne({ QuizId: id }).populate({
        path: "students.user",
        select: "username firstName lastName",
      });
      return res.status(SUCCESS_CODE).send(quiz);
    } catch (err) {
      console.log(err);
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
};

const a = {
  testMailSend: async (req, res) => {
    const mailContent = "Testing Mail is delivered successfully";
    const mailSubject = "Testing Success";

    if (
      MailingSystem.sendMail({
        subject: mailSubject,
        to: "baraiyaprnv@gmail.com",
        template: "welcome-mail",
        context: {
          name: "Pranav Baraiya",
        },
      })
    ) {
      return res.status(201).send("Email Sent");
    } else {
      return res.status(301).send("Email Sending Failed");
    }
  },
  sc: async (req, res) => {
    PythonShell.run(path.join(__dirname, "/python_test.py"), null).then(
      (messages) => {
        return res.status(201).send(messages);
      }
    );
    console.log("End");
  },
};

module.exports = { JWT, ZegocloudTokenGenerator, User, Quiz, QuizResult, a };
