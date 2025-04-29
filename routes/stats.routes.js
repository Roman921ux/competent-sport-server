import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { statsController } from "../controllers/stats.controller.js";
const router = express.Router();

router.get(
  "/exercise/:exerciseId",
  checkAuth,
  statsController.getExerciseStats,
);

export default router;
