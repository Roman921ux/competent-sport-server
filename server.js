import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { authValidator } from "./validations/auth-validation.js";
import { authController } from "./controllers/auth-controller.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const MONGODB_HOST = process.env.MONGODB_HOST;
const MONGODB_PORT = process.env.MONGODB_PORT;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD);
const MONGODB_DBNAME = process.env.MONGODB_DBNAME;
const DATABASE_URL = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}?authSource=admin&directConnection=true`;

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("✳️ Подключение к MongoDB прошло успешно"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.get("/", (req, res) => {
  res.send("Привет, Express!");
});

app.post("/auth/register", authValidator.register, authController.register);
app.post("/auth/login", authValidator.login, authController.login);

app.listen(PORT, () => {
  console.log(`✳️ Сервер запущен на http://localhost:${PORT}`);
});
