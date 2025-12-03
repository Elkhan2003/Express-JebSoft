import { Router } from "express";
import todoRoutes from "../modules/todo/todo.routes";
import userRoutes from "../modules/user/user.routes";

const router = Router();

router.use("/todo", todoRoutes);
router.use("/user", userRoutes);

export default router;
