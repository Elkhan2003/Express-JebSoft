import { Router } from "express";
import todoController from "./todo.controller";

const router = Router();

router.get("/get-all", todoController.getTodos);
router.post("/create", todoController.createTodo);
router.delete("/delete/:id", todoController.deleteTodo);

export default router;
