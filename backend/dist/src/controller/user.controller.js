"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
const config_1 = __importDefault(require("../../config"));
const JWT_SECRET = config_1.default.SECRET_KEY;
const register = async (req, res, next) => {
    const { name, email, password, avatar, contactNo, userType } = req.body;
    try {
        const existingUser = await user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.default({
            name,
            email,
            password: hashedPassword,
            avatar,
            contactNo,
            userType,
            status: true,
        });
        await newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: newUser.toJSON() });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: user.toJSON() });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.login = login;
const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const { name, email, avatar, contactNo, userType, status } = req.body;
    try {
        const user = await user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.avatar = avatar || user.avatar;
        user.contactNo = contactNo || user.contactNo;
        user.userType = userType || user.userType;
        user.status = status !== undefined ? status : user.status;
        await user.save();
        res.status(200).json({ message: 'User updated successfully', user: user.toJSON() });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=user.controller.js.map