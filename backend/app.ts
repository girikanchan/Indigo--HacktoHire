import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import request from "request";
import cors from "cors";
import cookies from "cookies";
import cookieSession from "cookie-session";
import helmet from "helmet";
import config from "./config";
import router from './routes';


if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env" });
}

const app = express();


app.use('/api', router);

app.use(cors({ origin: "*" }));

if (config.NODE_ENV === "production") {
  app.use(helmet());
}

mongoose.connect(
  config.MONGODB_URI as string
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
