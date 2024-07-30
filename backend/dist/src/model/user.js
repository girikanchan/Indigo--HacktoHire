"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    contactNo: { type: String, required: true },
    userType: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
}, { timestamps: true });
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map