import { Router } from "express";
import userController from "./user.controller";

const router = Router();

router.get("/get", userController.getUsers);
router.get("/me/:id", userController.getMe);
router.post("/create", userController.createUser);
router.patch("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

export default router;
