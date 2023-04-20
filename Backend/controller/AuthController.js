const { JWT, ZegocloudTokenGenerator } = require("../utils/index");
const { User, Feedback } = require("./UserConteoller");
const {
  TeacherUser,
  QuizSubscriptionPayment,
} = require("./SubscriptionController");
const {
  Quiz,
  TeacherQuiz,
  Interview,
  QuizResult,
} = require("./QuizController");
const { UserRecording } = require("./ReocrdingController");

const testing = {
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
  testDrive: async (req, res) => {
    UserRecording.uploadToDrive("storage/Quiz 1/student2.mkv", "test.mkv");
  },
};

module.exports = {
  JWT,
  ZegocloudTokenGenerator,
  User,
  Quiz,
  TeacherQuiz,
  Interview,
  QuizResult,
  UserRecording,
  Feedback,
  TeacherUser,
  testing,
  QuizSubscriptionPayment,
};
