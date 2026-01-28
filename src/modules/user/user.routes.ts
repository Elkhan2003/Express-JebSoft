import { Router } from "express";
import userController from "./user.controller";

const router = Router();

router.get("/get", userController.getUsers);
router.get("/me/:id", userController.getMe);
router.post("/create", userController.createUser);
router.post("/create-bulk", userController.createUserBulk);
router.patch("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.delete("/delete-bulk", userController.deleteUserBulk);

export default router;
