"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_routes_1 = __importDefault(require("../modules/todo/todo.routes"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const router = (0, express_1.Router)();
router.use("/todo", todo_routes_1.default);
router.use("/user", user_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map