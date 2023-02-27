const express = require("express");
const {
  User,
  ZegocloudTokenGenerator,
  Quiz,
  a,
  JWT,
} = require("../controller/AuthController");
const router = express.Router();

router.get("/", a.test);
router.get("/yay", a.sc);

router.post("/register", User.register);
router.post("/login", User.login);

//Authenticate Routes
router.use(JWT.authenticateToken);
router.post("/generateToken", ZegocloudTokenGenerator.getToken);
router
  .get("/user", User.get)
  .get("/student", User.getStudent)
  .delete("/user", User.delete);
router
  .get("/quiz", Quiz.get)
  .get("/quiz/:id", Quiz.getById)
  .post("/quiz", Quiz.add)
  .put("/quiz", Quiz.update)
  .delete("/quiz", Quiz.delete);

module.exports = router;
