import { Router } from "express";
import authController from "./auth.controller";

const router = Router();

router.post("/google/login", authController.googleLogin);
router.post("/google/registration", authController.googleRegistration);

export default router;
