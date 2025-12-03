import { Router } from "express";
import userController from "./user.controller";

const router = Router();

router.get("/get-all", userController.getUsers);

export default router;
