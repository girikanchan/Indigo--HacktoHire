"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const customError_1 = __importDefault(require("../utils/customError"));
function errorHandler(err, req, res, next) {
    console.log("Printing Error:");
    console.log(err);
    if (err instanceof mongodb_1.MongoError) {
        if (err.code === 11000) {
            return res.status(409).json({
                data: {},
                meta: {
                    devMessage: 'Duplicate key error',
                    timestamp: new Date().getTime(),
                    status: false
                }
            });
        }
        else {
            return res.status(500).json({
                data: {},
                meta: {
                    devMessage: `MongoError: ${err.message}`,
                    timestamp: new Date().getTime(),
                    status: false
                }
            });
        }
    }
    if (err instanceof customError_1.default) {
        return res.status(err.code || 500).json({
            data: {},
            meta: {
                devMessage: err.message,
                timestamp: new Date().getTime(),
                status: false
            }
        });
    }
    return res.status(500).json({
        data: {},
        meta: {
            devMessage: 'Internal Server Error',
            timestamp: new Date().getTime(),
            status: false
        }
    });
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map