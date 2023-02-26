const express = require("express");
const {
  User,
  ZegocloudTokenGenerator,
  Quiz,
  a,
  requireAdmin,
  JWT,
} = require("../controller/AuthController");
const router = express.Router();

router.get("/", a.test);
router.get("/yay", a.sc);
router.post("/generateToken", ZegocloudTokenGenerator.getToken);

router.post("/register", User.register);
router.post("/login", User.login);
router.delete("/delete", User.delete);
router.get("/users", User.get);

//Quiz
router.use(JWT.authenticateToken);
router
  .get("/quiz", Quiz.get)
  .get("/quiz/:id", Quiz.getById)
  .post("/quiz", Quiz.add)
  .put("/quiz", Quiz.update)
  .delete("/quiz", Quiz.delete);

module.exports = router;
