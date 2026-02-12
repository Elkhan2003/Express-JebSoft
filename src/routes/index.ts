import { Router } from "express";
import cors from "cors";
import uploadRoutes from "../modules/upload/upload.routes";
import todoRoutes from "../modules/todo/todo.routes";
import userRoutes from "../modules/user/user.routes";
import messageRoutes from "../modules/message/message.routes";

const corsConfig = {
	origin: ["http://localhost:3000"],
	credentials: true,
};

const router = Router();

router.use("/upload", cors(corsConfig), uploadRoutes);
router.use("/todo", cors(corsConfig), todoRoutes);
router.use("/user", cors(corsConfig), userRoutes);
router.use("/message", cors(corsConfig), messageRoutes);

export default router;
