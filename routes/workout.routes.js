import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { workoutValidation } from "../validations/workout.validation.js";
import { workoutController } from "../controllers/workout.controller.js";

const router = express.Router();

router.post(
  "/",
  checkAuth,
  workoutValidation.createWorkout,
  workoutController.createWorkout,
);

export default router;
