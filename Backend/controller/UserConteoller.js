const {
  QuizResultModel,
  QuizModel,
  UserModel,
  FeedbackModel,
  UserRecordingModel,
} = require("../model/model.js");
const {
  constants,
  comparePassword,
  JWT,
  MailingSystem,
  cryptingPassword,
  getRandomPassword,
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
    const oldPassword = data.password;

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
              username: user.username,
              password: oldPassword,
            },
          });
          return res.status(SUCCESS_CODE).send("User Created Succesfully");
        }
      });
    } catch (err) {
      console.log(err);
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
            const oldPassword = user.password;
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
                username: user.username,
                password: oldPassword,
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
  usersERPRegister: async (req, res) => {
    const data = req.body;
    const error = { username: false, email: false };
    var message = "User Created Succesfully ";
    try {
      for (let i = 0; i < data.length; i++) {
        if (data) {
          const user = await UserModel.findOne({ username: data[i].username });
          if (user) {
            error.username = true;
            continue;
          }
          const email = await UserModel.findOne({ email: data[i].email });
          if (email) {
            error.email = true;
            continue;
          }
        }
        const password = getRandomPassword();
        const user = {
          ...data[i],
          password,
          roles: "student",
        };
        cryptingPassword(user.password, async function (err, hash) {
          if (err) {
            console.log("CRY:", err);
            return res.status(ERROR_CODE).send(err);
          } else {
            const oldPassword = user.password;
            user.password = hash;
            const userObj = new UserModel(user);
            await userObj.save();

            MailingSystem.sendMail({
              to: user.email,
              subject: "Welcome To ProctoVigil",
              template: "welcome-mail",
              context: {
                name: user.firstName + " " + user.lastName,
                username: user.username,
                password: oldPassword,
              },
            });
          }
        });
      }
      if (error.username) {
        message += "same username found ";
      }
      if (error.email) {
        message += "same email found";
      }
      return res.status(SUCCESS_CODE).send(message);
    } catch (err) {
      console.log(err);
      return res.status(ERROR_CODE).send("User CreationFailed");
    }
  },
  publicStudent: async (req, res) => {
    try {
      // const users = await UserModel.find(
      //   { roles: "student" },
      //   { username: 1, _id: 0, firstName: 1, lastName: 1, email: 1 }
      // ).limit(2);
      const users = [
        {
          username: "erpStudent1",
          firstName: "Test",
          lastName: "Student1",
          email: "erptest@student.com",
        },
        {
          username: "erpStudent2",
          firstName: "Test",
          lastName: "Student2",
          email: "erptest2@student.com",
        },
        {
          username: "erpStudent3",
          firstName: "Test",
          lastName: "Student3",
          email: "erptest3@student.com",
        },
      ];
      return res.status(SUCCESS_CODE).send(users);
    } catch (err) {
      return res.status(ERROR_CODE).send("User Getting Error: " + err);
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
      console.log(err);
      return res.status(ERROR_CODE).send("There is some error: " + err);
    }
  },
  delete: async (req, res) => {
    try {
      const feedback = await FeedbackModel.findOne(req.body);
      feedback.remove();
      return res.status(SUCCESS_CODE).send("Feedback Deleted Successfully");
    } catch (err) {
      return res.status(ERROR_CODE).send("Feedback Delted Error: " + err);
    }
  },
};

module.exports = { User, Feedback };
