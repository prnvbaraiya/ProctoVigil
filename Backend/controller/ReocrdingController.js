const multer = require("multer");
const fs = require("fs");
const { GoogleDriveService } = require("./googleDriveService");
const {
  QuizModel,
  UserModel,
  UserRecordingModel,
} = require("../model/model.js");
const { constants } = require("../utils/index");

const ERROR_CODE = constants.ERROR_CODE;
const SUCCESS_CODE = constants.SUCCESS_CODE;

const driveClientId = constants.driveClientId;
const driveClientSecret = constants.driveClientSecret;
const driveRedirectUri = constants.driveRedirectUri;
const driveRefreshToken = constants.driveRefreshToken;

const videoStoringPath = constants.videoStoringPath;
const driveFolderName = constants.driveFolderName;

const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage }).single("videoBlob");

const UserRecording = {
  add: async (req, res) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      const { quiz_id, username } = req.body;
      const quiz = await QuizModel.findById(quiz_id);

      const fileData = req.file.buffer; // Get the file data from memory

      const link = await UserRecording.uploadToDrive(
        fileData,
        `${username}-${quiz.name}.mkv`,
        quiz.name
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

  uploadToDrive: async (fileBuffer, driveFileName, drivePathFolderName) => {
    const googleDriveService = new GoogleDriveService(
      driveClientId,
      driveClientSecret,
      driveRedirectUri,
      driveRefreshToken
    );

    let parentFolder = await googleDriveService.searchFolder(driveFolderName);
    if (!parentFolder) {
      parentFolder = await googleDriveService.createFolder(driveFolderName);
    }

    let folder = await googleDriveService.searchFolder(drivePathFolderName);
    if (!folder) {
      folder = await googleDriveService.createFolder(
        drivePathFolderName,
        parentFolder.id
      );
    }

    const savedFile = await googleDriveService
      .saveFile(driveFileName, fileBuffer, "video/webm;codecs=vp9", folder.id)
      .catch((error) => {
        console.error(error);
        return;
      });
    console.info("File uploaded successfully!");

    const permission = await googleDriveService
      .createPermission(savedFile.data.id)
      .catch((error) => {
        console.error(error);
      });

    return `https://drive.google.com/uc?id=${savedFile.data.id}`;
  },
};

module.exports = { UserRecording };
