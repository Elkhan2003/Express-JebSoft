"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = __importDefault(require("./todo.controller"));
const router = (0, express_1.Router)();
router.get("/get-all", todo_controller_1.default.getTodos);
exports.default = router;
//# sourceMappingURL=todo.routes.js.map