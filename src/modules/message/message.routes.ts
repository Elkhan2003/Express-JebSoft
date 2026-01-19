import { Router } from "express";
import userController from "./message.controller";

const router = Router();

router.get("/get/:userId", userController.getMessages);
router.post("/send", userController.sendMessage);

export default router;
