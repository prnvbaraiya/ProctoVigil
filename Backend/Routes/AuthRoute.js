const express = require("express");
const {
  User,
  ZegocloudTokenGenerator,
  Quiz,
  TeacherQuiz,
  Interview,
  Feedback,
  testing,
  JWT,
  QuizResult,
  TeacherUser,
  UserRecording,
  QuizSubscriptionPayment,
} = require("../controller/AuthController");
const router = express.Router();

router.get("/test-mail", testing.testMailSend);

router.post("/register", User.register);
router.post("/login", User.login);

router.get("/public/student", User.publicStudent);

router
  .post("/feedback", Feedback.add)
  .get("/feedback", Feedback.get)
  .get("/feedback/:id", Feedback.getById)
  .delete("/feedback", Feedback.delete);

//Authenticate Routes
router.use(JWT.authenticateToken);
router.post("/generateToken", ZegocloudTokenGenerator.getToken);
router
  .get("/user", User.get)
  .get("/student", User.getStudent)
  .post("/user", User.register)
  .post("/users", User.usersRegister)
  .post("/users/erp", User.usersERPRegister)
  .post("/user/find", User.find)
  .put("/user", User.update)
  .delete("/user", User.delete)
  .delete("/users", User.usersDelete);
router
  .get("/quiz", Quiz.get)
  .get("/quiz/:id", Quiz.getById)
  .get("/quiz/user/:id", Quiz.getByUserId)
  .post("/quiz", Quiz.add)
  .put("/quiz", Quiz.update)
  .delete("/quiz", Quiz.delete);
router
  .get("/teacher/quiz/:userId", TeacherQuiz.get)
  .get("/quiz/:id", TeacherQuiz.getById)
  .get("/quiz/user/:id", TeacherQuiz.getByUserId)
  .post("/quiz", TeacherQuiz.add)
  .put("/quiz", TeacherQuiz.update)
  .delete("/quiz", TeacherQuiz.delete);
router
  .get("/interview", Interview.get)
  .get("/interview/:id", Interview.getById)
  .get("/interview/user/:id", Interview.getByUserId)
  .post("/interview", Interview.add)
  .put("/interview", Interview.update)
  .delete("/interview", Interview.delete);
router
  .get("/quiz-result", QuizResult.get)
  .get("/quiz-result/:id", QuizResult.getById)
  .post("/quiz-result/send-mail", QuizResult.sendResultMail)
  .post("/quiz-result", QuizResult.add)
  .put("/quiz-result/:quizId", QuizResult.add)
  .put("/quiz-result", QuizResult.updateMarks)
  .delete("/quiz-result/student", QuizResult.deleteStudent);

router
  .post("/user-recording", UserRecording.add)
  .post("/user-recording/file-path", UserRecording.sendFile)
  .get("/user-recording", UserRecording.get);

router
  .post("/quiz-point", TeacherUser.update)
  .get("/quiz-point/:id", TeacherUser.getByUserId);

router
  .post("/quiz-point-payment", QuizSubscriptionPayment.register)
  .get("/quiz-point-payment", QuizSubscriptionPayment.get)
  .get("/quiz-point-payment/:id", QuizSubscriptionPayment.getById)
  .get("/quiz-point-payment/user/:userId", QuizSubscriptionPayment.getByUserId);

module.exports = router;
