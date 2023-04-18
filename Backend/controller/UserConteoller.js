const {
  QuizResultModel,
  QuizModel,
  UserModel,
  UserRecordingModel,
  QuizSubscriptionPoint,
} = require("../model/model.js");
const {
  constants,
  comparePassword,
  JWT,
  MailingSystem,
} = require("../utils/index.js");

const ERROR_CODE = constants.ERROR_CODE;
const SUCCESS_CODE = constants.SUCCESS_CODE;

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

const TeacherUser = {
  register: async (req, res) => {
    try {
      const data = req.body;
      const tmp = await QuizSubscriptionPoint.create(data);
      return res
        .status(SUCCESS_CODE)
        .send("Quiz Subscription Point Updated Successfully");
    } catch (err) {
      return res
        .status(ERROR_CODE)
        .send("Quiz Subscription Point Update Error: " + err);
    }
  },
  getByUserId: async (req, res) => {
    try {
      const id = req.params.id;
      var quizPoints = await QuizSubscriptionPoint.findOne({
        user_id: id,
      }).populate("user_id", "firstName lastName email");
      if (quizPoints.length == 0) {
        quizPoints = await QuizSubscriptionPoint.create({ user_id: id });
      }
      return res.status(SUCCESS_CODE).send(quizPoints);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      const tmp = await QuizSubscriptionPoint.findByIdAndUpdate(data._id, data);
      if (!tmp) {
        await QuizSubscriptionPoint.create(data);
      }
      return res
        .status(SUCCESS_CODE)
        .send("Quiz Subscription Point Updated Successfully");
    } catch (err) {
      return res
        .status(ERROR_CODE)
        .send("Quiz Subscription Point Update Error: " + err);
    }
  },
};

const Feedback = {
  add: async (req, res) => {
    try {
      await FeedbackModel.create(req.body);
      return res.status(SUCCESS_CODE).send("Feedback added Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  get: async (req, res) => {
    try {
      const feedbacks = await FeedbackModel.find();
      return res.status(SUCCESS_CODE).send(feedbacks);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const feedback = await FeedbackModel.findById(id);
      return res.status(SUCCESS_CODE).send(feedback);
    } catch (err) {
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
};

module.exports = { User, Feedback, TeacherUser };
