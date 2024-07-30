"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt = require('jsonwebtoken');
const config_1 = __importDefault(require("../../config"));
const SECRET_KEY = config_1.default.SECRET_KEY;
async function auth(req, res, next) {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            let userId = req.userId = user.id;
            console.log("userId", userId);
        }
        else {
            res.status(401).json({ message: "Unauthorized user" });
            return;
        }
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Unauthorized user" });
    }
}
exports.auth = auth;
;
//# sourceMappingURL=auth.js.map