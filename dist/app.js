"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildServer = void 0;
const express_1 = __importDefault(require("express"));
const buildServer = () => {
    const server = (0, express_1.default)();
    server.use(express_1.default.json());
    server.get("/", (req, res) => {
        res.status(200).send({
            message: "Hello, World!",
        });
    });
    return server;
};
exports.buildServer = buildServer;
//# sourceMappingURL=app.js.map