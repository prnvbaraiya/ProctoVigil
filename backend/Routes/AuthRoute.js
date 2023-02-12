import { Router } from "express";
import { User, ZegocloudTokenGenerator } from "../controller/AuthController.js";
const router = Router();

router.get("/yay", User.register);
router.post("/generateToken", ZegocloudTokenGenerator.getToken);

router.post("/admin/auth-login", User.login);

export default router;
