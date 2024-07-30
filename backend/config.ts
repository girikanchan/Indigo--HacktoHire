const NODE_ENV = process.env.NODE_ENV || "development";
const MONGODB_URI = process.env.MONGODB_URI || "";
const SECRET_KEY = process.env.SECRET_KEY;
const ACCESS_KEY = process.env.ACCESS_KEY;
const EMAIL_NODEMAILER_PASSWORD = process.env.EMAIL_NODEMAILER_PASSWORD;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const PORT = process.env.PORT;
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const config = {
    PORT,
    NODE_ENV,
    MONGODB_URI,
    SECRET_KEY,
    ACCESS_KEY,
    EMAIL_NODEMAILER_PASSWORD,
    EMAIL_USERNAME,
    RABBITMQ_URL,
};

export default config;
