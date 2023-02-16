import { Router } from "express";
import {
  User,
  ZegocloudTokenGenerator,
  Quiz,
} from "../controller/AuthController.js";
const router = Router();

router.get("/yay", User.register);
router.post("/generateToken", ZegocloudTokenGenerator.getToken);

router.post("/admin/auth-login", User.login);
router.post("/quiz/add", Quiz.add);
router.get("/quizzes", Quiz.get);

export default router;
