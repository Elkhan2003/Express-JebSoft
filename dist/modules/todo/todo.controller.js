"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTodos = async (req, res) => {
    try {
        const data = [
            {
                name: "Завершить уроки завтра",
                description: "в 10:00",
            },
        ];
        res.status(200).send({
            success: true,
            data: data,
        });
    }
    catch (e) {
        console.error("Error in getTodos:", e);
    }
};
exports.default = { getTodos };
//# sourceMappingURL=todo.controller.js.map