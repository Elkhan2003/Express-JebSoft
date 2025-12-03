"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUsers = async (req, res) => {
    try {
        const data = [
            {
                name: "Санжар",
                description: "Он мой друг",
            },
        ];
        res.status(200).send({
            success: true,
            data: data,
        });
    }
    catch (e) {
        console.error("Error in getUsers:", e);
    }
};
exports.default = { getUsers };
//# sourceMappingURL=user.controller.js.map