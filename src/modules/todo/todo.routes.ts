import { Router } from "express";
import todoController from "./todo.controller";

const router = Router();

router.get("/get-all", todoController.getTodos);

export default router;
