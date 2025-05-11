import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { workoutValidation } from "../validations/workout.validation.js";
import { workoutController } from "../controllers/workout.controller.js";

const router = express.Router();

// создание тренировки
router.post(
  "/",
  checkAuth,
  workoutValidation.createWorkout,
  workoutController.createWorkout,
);
// получение всех тренировок
router.get("/", checkAuth, workoutController.getAll);
// получение одной тренировки
router.get("/:workoutId", checkAuth, workoutController.getOne);

// редактирование тренировки
router.patch(
  "/:workoutId",
  checkAuth,
  workoutValidation.editWorkout,
  workoutController.editWorkout,
);

// добавления упражнения в тренировку
router.patch(
  "/:workoutId/exercises/:exerciseId",
  checkAuth,
  workoutController.addExerciseToWorkout,
);
// добавление подхода в тренировку
router.patch(
  "/:workoutId/exercises/:exerciseId/set",
  checkAuth,
  workoutValidation.addSetToExercise,
  workoutController.createSet,
);
// редактирование подхода в тренировке
router.patch(
  "/:workoutId/exercises/:exerciseId/set/:setId",
  checkAuth,
  workoutValidation.editSetToExercise,
  workoutController.editSet,
);

// удаление тренировки
router.delete("/:workoutId", checkAuth, workoutController.removeWorkout);
// удаление упражнения в тренировке
router.delete(
  "/:workoutId/exercises/:exerciseId",
  checkAuth,
  workoutController.removeExercise,
);
// удаление подхода в тренировке
router.delete(
  "/:workoutId/exercises/:exerciseId/set/:setId",
  checkAuth,
  workoutController.removeSet,
);

export default router;
