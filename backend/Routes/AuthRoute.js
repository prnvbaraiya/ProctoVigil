import { Router } from "express";
import { User } from "../controller/AuthController.js";
const router = Router();

router.get("/yay", User.register);

router.post("/admin/auth-login", User.login);

export default router;
