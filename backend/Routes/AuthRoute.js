import { Router } from "express";
import {
  User,
  ZegocloudTokenGenerator,
  Quiz,
  a,
} from "../controller/AuthController.js";
const router = Router();

router.get("/yay", a.sc);
router.post("/generateToken", ZegocloudTokenGenerator.getToken);

router.post("/admin/auth-login", User.login);

//Quiz
router.get("/quizzes", Quiz.get);
router.get("/quiz/:id", Quiz.getById);
router.post("/quiz/add", Quiz.add);
router.post("/quiz/update/:id", Quiz.update);
router.post("/quiz/delete/:id", Quiz.delete);

export default router;
