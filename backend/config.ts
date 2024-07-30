const NODE_ENV = process.env.NODE_ENV || "development";
const MONGODB_URI = process.env.MONGODB_URI || "";
const SECRET_KEY = process.env.SECRET_KEY;
const ACCESS_KEY = process.env.ACCESS_KEY;

const config = {
    NODE_ENV,
    MONGODB_URI,
    SECRET_KEY,
    ACCESS_KEY,
};

export default config;
