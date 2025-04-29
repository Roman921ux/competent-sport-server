import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// routes
import authRoutes from "./routes/auth.routes.js";
import workoutRoutes from "./routes/workout.routes.js";
import exerciseRoutes from "./routes/exercise.routes.js";
import userRoutes from "./routes/user.routes.js";
import statsRoutes from "./routes/stats.routes.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const DATABASE_URL = process.env.MONGO_URI;

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("✳️ Подключение к MongoDB прошло успешно"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.get("/", (req, res) => {
  res.send("<h1>Вы попали на сервер Titan Forge</h1>");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/workout", workoutRoutes);
app.use("/api/v1/exercise", exerciseRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/stats", statsRoutes);

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(err.statusCode || 400).json(err);
  }

  res.status(500).json({ message: "Server Error" });
});
app.listen(PORT, () => {
  console.log(`✳️ Сервер запущен на http://localhost:${PORT}`);
});
