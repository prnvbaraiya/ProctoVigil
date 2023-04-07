const express = require("express");
const {
  User,
  ZegocloudTokenGenerator,
  Quiz,
  Interview,
  Feedback,
  a,
  JWT,
  QuizResult,
  UserRecording,
} = require("../controller/AuthController");
const router = express.Router();

router.get("/test-mail", a.testMailSend);
router.get("/yay", a.sc);

router.post("/register", User.register);
router.post("/login", User.login);

//Authenticate Routes
router.use(JWT.authenticateToken);
router.post("/generateToken", ZegocloudTokenGenerator.getToken);
router
  .get("/user", User.get)
  .get("/student", User.getStudent)
  .post("/user", User.register)
  .post("/users", User.usersRegister)
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
  .get("/teacher/quiz/:userId", Quiz.get)
  .get("/quiz/:id", Quiz.getById)
  .get("/quiz/user/:id", Quiz.getByUserId)
  .post("/quiz", Quiz.add)
  .put("/quiz", Quiz.update)
  .delete("/quiz", Quiz.delete);
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
  .delete("/quiz-result/student", QuizResult.deleteStudent);

router
  .post("/user-recording", UserRecording.add)
  .post("/user-recording/file-path", UserRecording.sendFile)
  .get("/user-recording", UserRecording.get);

router
  .post("/feedback", Feedback.add)
  .get("/feedback", Feedback.get)
  .post("/feedback/:id", Feedback.getById);

module.exports = router;
