import { Router } from "express";
import todoRoutes from "../modules/todo/todo.routes";
import userRoutes from "../modules/user/user.routes";
import messageRoutes from "../modules/message/message.routes";

const router = Router();

router.use("/todo", todoRoutes);
router.use("/user", userRoutes);
router.use("/message", messageRoutes);

export default router;
