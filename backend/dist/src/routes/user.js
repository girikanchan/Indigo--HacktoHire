"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.register);
router.post('/login', user_controller_1.login);
router.put('/:userId', auth_1.auth, user_controller_1.updateUser);
exports.default = router;
//# sourceMappingURL=user.js.map