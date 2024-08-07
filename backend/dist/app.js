"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
if (process.env.NODE_ENV === "development") {
    dotenv_1.default.config({ path: ".env" });
}
const app = (0, express_1.default)();
app.use('/api', routes_1.default);
app.use((0, cors_1.default)({ origin: "*" }));
if (config_1.default.NODE_ENV === "production") {
    app.use((0, helmet_1.default)());
}
mongoose_1.default.connect(config_1.default.MONGODB_URI);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});
const PORT = config_1.default.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map