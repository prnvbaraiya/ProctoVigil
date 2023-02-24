const express = require("express");
const {
  User,
  ZegocloudTokenGenerator,
  Quiz,
  a,
  requireAdmin,
} = require("../controller/AuthController");
const router = express.Router();

router.get("/", a.test);
router.get("/yay", a.sc);
router.post("/generateToken", ZegocloudTokenGenerator.getToken);

router.post("/register", User.register);
router.post("/login", User.login);

//Quiz
router.get("/quizzes", Quiz.get);
router.get("/quiz/:id", Quiz.getById);
router.post("/quiz/add", Quiz.add);
router.post("/quiz/update/:id", Quiz.update);
router.post("/quiz/delete/:id", Quiz.delete);

module.exports = router;
