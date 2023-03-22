const express = require("express");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { GoogleDriveService } = require("./googleDriveService");
const viewPath = path.resolve(__dirname, "./../templates/views");
const { generateToken04 } = require("../zgocloud/zegoServerAssistant.js");
const {
  QuizResultModel,
  QuizModel,
  UserModel,
  UserRecordingModel,
} = require("../model/model.js");
const { PythonShell } = require("python-shell");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Variables
const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || "";
const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || "";
const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || "";
const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || "";

const ERROR_CODE = 500;
const SUCCESS_CODE = 202;

const videoStoringPath = "storage";
const driveFolderName = "Video";

const cryptingPassword = (password, callback) => {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return callback(err);

    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return callback(err);
      callback(null, hash);
    });
  });
};

const comparePassword = (plainPass, hashword, callback) => {
  bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
    return err == null ? callback(null, isPasswordMatch) : callback(err);
  });
};

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

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return false;
      } else {
        return true;
      }
    });
  },
};

const User = {
  userDelete: async (userIds) => {
    try {
      const quizAuth = await QuizModel.deleteMany({ author: { $in: userIds } });
      const quizStu = await QuizModel.updateMany(
        { studentNames: { $in: userIds } },
        { $pull: { studentNames: { $in: userIds } } }
      );
      const userRec = await UserRecordingModel.updateMany(
        { "students.user_id": userIds },
        { $pull: { students: { user_id: { $in: userIds } } } }
      );
      const quizRes = await QuizResultModel.updateMany(
        { students: { $elemMatch: { user: { $in: userIds } } } },
        { $pull: { students: { user: { $in: userIds } } } }
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  register: async (req, res) => {
    var data = req.body;

    try {
      cryptingPassword(data.password, async function (err, hash) {
        if (err) {
          return res.status(ERROR_CODE).send(err);
        } else {
          data.password = hash;
          const user = await UserModel.create(data);
          MailingSystem.sendMail({
            to: user.email,
            subject: "Welcome To ProctoVigil",
            template: "welcome-mail",
            context: {
              name: user.firstName + " " + user.lastName,
            },
          });
          return res.status(SUCCESS_CODE).send("User Created Succesfully");
        }
      });
    } catch (err) {
      return res.status(ERROR_CODE).send("Server Error: " + err);
    }
  },
  usersRegister: async (req, res) => {
    const users = req.body;

    try {
      const userObjs = [];
      for (const user of users) {
        cryptingPassword(user.password, async function (err, hash) {
          if (err) {
            return res.status(ERROR_CODE).send(err);
          } else {
            user.password = hash;
            const userObj = new UserModel(user);
            userObjs.push(userObj);

            await userObj.save();

            MailingSystem.sendMail({
              to: user.email,
              subject: "Welcome To ProctoVigil",
              template: "welcome-mail",
              context: {
                name: user.firstName + " " + user.lastName,
              },
            });
          }
        });
      }

      return res.status(SUCCESS_CODE).send("Users created successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("Server Error: " + err);
    }
  },
  login: async (req, res) => {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user) {
      comparePassword(
        req.body.password,
        user.password,
        async function (err, isPasswordMatch) {
          if (err) {
            return res.status(ERROR_CODE).send(err);
          }
          if (isPasswordMatch) {
            const accessToken = JWT.generateToken(user);
            return res
              .status(SUCCESS_CODE)
              .send({ accessToken, roles: user.roles });
          } else {
            return res.status(ERROR_CODE).send("Username or Password is wrong");
          }
        }
      );
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
      return res.status(SUCCESS_CODE).send("User Updated Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("User Update Error: " + err);
    }
  },
  delete: async (req, res) => {
    try {
      const user = await UserModel.findOne(req.body);
      user.remove();
      if (User.userDelete([user._id]))
        return res.status(SUCCESS_CODE).send("User Deleted Successfully");
      else return res.status(ERROR_CODE).send("User Delted Error: " + err);
    } catch (err) {
      return res.status(ERROR_CODE).send("User Delted Error: " + err);
    }
  },
  usersDelete: async (req, res) => {
    const ids = req.body;
    try {
      const deletedUsers = await UserModel.deleteMany({ _id: { $in: ids } });
      User.userDelete(ids);
      if (deletedUsers.deletedCount === 0) {
        return res.status(ERROR_CODE).send("No users found with provided ids");
      }
      res.status(SUCCESS_CODE).send("Users deleted successfully");
    } catch (err) {
      console.error(err);
      res.status(ERROR_CODE).send("Error deleting users");
    }
  },
};

const Quiz = {
  add: async (req, res) => {
    const user = await UserModel.findOne({ username: req.body.author });
    const data = { ...req.body, author: user._id };
    try {
      await QuizModel.create(data);
      return res.status(SUCCESS_CODE).send("Quiz Created Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  get: async (req, res) => {
    try {
      // const quizzes = await QuizModel.find({ startDate: { $gt: Date.now() } })
      const quizzes = await QuizModel.find()
        .sort({ name: 1 })
        .populate({
          path: "author",
          select: "firstName lastName",
        })
        .populate({
          path: "studentNames",
          select: "username",
        });
      return res.status(SUCCESS_CODE).send(quizzes);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const quiz = await QuizModel.findById(id)
        .populate({
          path: "author",
          select: "firstName lastName",
        })
        .populate({
          path: "studentNames",
          select: "username",
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
      return res.status(SUCCESS_CODE).send("Quiz Updated Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  delete: async (req, res) => {
    try {
      const data = await QuizModel.findByIdAndDelete(req.body.id);
      return res.status(SUCCESS_CODE).send("Quiz Deleted Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
};

const QuizResult = {
  add: async (req, res) => {
    try {
      const { QuizId, totalMarks, students } = req.body;

      // Find the quiz result document by QuizId
      let quizResult = await QuizResultModel.findOne({ QuizId });

      // If the document does not exist, create a new one
      if (!quizResult) {
        quizResult = new QuizResultModel({ QuizId, totalMarks });
      }

      // Iterate through the students and add or update the quiz result
      const {
        username,
        answerKey,
        studentAnswer,
        obtainedMarks,
        warningCount,
      } = students;

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

      res.status(SUCCESS_CODE).send("Quiz result added successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
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
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  sendResultMail: async (req, res) => {
    try {
      const quizResults = await QuizResultModel.findOne(req.body)
        .populate("students.user", "username firstName lastName email")
        .populate("QuizId", "name");

      const { totalMarks, students } = quizResults;

      for (const { user, obtainedMarks } of students) {
        MailingSystem.sendMail({
          to: user.email,
          subject: "Result Notification",
          template: "exam-result",
          context: {
            name: `${user.firstName} ${user.lastName}`,
            QuizTitle: quizResults.QuizId.name,
            obtainedMarks,
            totalMarks,
          },
        });
      }

      return res.status(SUCCESS_CODE).send(quizResults);
    } catch (err) {
      console.error(err);
      return res.status(ERROR_CODE).send(`There is some error: ${err}`);
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const quizResults = await QuizResultModel.findOne({
        QuizId: req.body.quizId,
      });

      quizResults.students = quizResults.students.filter(
        (item) => item.user.toString() !== req.body._id
      );
      await quizResults.save();

      return res
        .status(SUCCESS_CODE)
        .send("User Response Removed Successfully");
    } catch (err) {
      console.error(err);
      return res.status(ERROR_CODE).send(`There is some error: ${err}`);
    }
  },
};

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const quiz = await QuizModel.findById(req.body.quiz_id, { name: 1 });
    const quizDir = path.join(videoStoringPath, quiz.name);
    if (!fs.existsSync(quizDir)) {
      fs.mkdirSync(quizDir, { recursive: true });
    }
    cb(null, quizDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("videoBlob");

const UserRecording = {
  add: async (req, res) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      const { quiz_id, username } = req.body;

      const link = await UserRecording.uploadToDrive(
        req.file.path,
        `${username}.mkv`
      );

      let userRecording = await UserRecordingModel.findOne({ quiz_id });

      if (!userRecording) {
        userRecording = new UserRecordingModel({ quiz_id });
      }

      const user = await UserModel.findOne({ username });

      if (user) {
        const existingUser = userRecording.students.find(
          (u) => u.user_id.toString() === user._id.toString()
        );
        if (existingUser) {
          existingUser.driveLink = link;
        } else {
          userRecording.students.push({
            user_id: user._id,
            driveLink: link,
          });
        }
      }

      await userRecording.save();
      return res.status(200).send("recording saved successfully");
    });
  },
  get: async (req, res) => {
    try {
      const quizzes = await UserRecordingModel.find()
        .populate("students.user_id", "username firstName lastName email")
        .populate("quiz_id", "name");
      return res.status(SUCCESS_CODE).send(quizzes);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  sendFile: async (req, res) => {
    try {
      const { filePath } = req.body;
      const fileBuffer = fs.readFileSync(filePath);
      return res.status(SUCCESS_CODE).send(fileBuffer);
    } catch (err) {
      return res.status(ERROR_CODE).send("Server Error");
    }
  },

  uploadToDrive: async (localPath, driveFileName) => {
    const googleDriveService = new GoogleDriveService(
      driveClientId,
      driveClientSecret,
      driveRedirectUri,
      driveRefreshToken
    );

    const finalPath = localPath;

    if (!fs.existsSync(finalPath)) {
      throw new Error("File not found!");
    }

    let folder = await googleDriveService
      .searchFolder(driveFolderName)
      .catch((error) => {
        console.error(error);
        return null;
      });

    if (!folder) {
      folder = await googleDriveService.createFolder(driveFolderName);
    }

    const savedFile = await googleDriveService
      .saveFile(driveFileName, finalPath, "video/webm;codecs=vp9", folder.id)
      .catch((error) => {
        console.error(error);
      });
    console.info("File uploaded successfully!");

    const permission = await googleDriveService
      .createPermission(savedFile.data.id)
      .catch((error) => {
        console.error(error);
      });

    fs.unlinkSync(finalPath);

    return `https://drive.google.com/uc?id=${savedFile.data.id}`;
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
  testDrive: async (req, res) => {
    UserRecording.uploadToDrive("storage/Quiz 1/student2.mkv", "test.mkv");
  },
};

module.exports = {
  JWT,
  ZegocloudTokenGenerator,
  User,
  Quiz,
  QuizResult,
  UserRecording,
  a,
};
