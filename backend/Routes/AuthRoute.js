const express = require("express");
const {
  User,
  ZegocloudTokenGenerator,
} = require("../controller/AuthController");
const { Quiz } = require("../controller/AuthController");
const { a } = require("../controller/AuthController");
const router = express.Router();

router.get("/", a.test);
router.get("/yay", a.sc);
router.post("/generateToken", ZegocloudTokenGenerator.getToken);

router.post("/admin/auth-login", User.login);

//Quiz
router.get("/quizzes", Quiz.get);
router.get("/quiz/:id", Quiz.getById);
router.post("/quiz/add", Quiz.add);
router.post("/quiz/update/:id", Quiz.update);
router.post("/quiz/delete/:id", Quiz.delete);

module.exports = router;
