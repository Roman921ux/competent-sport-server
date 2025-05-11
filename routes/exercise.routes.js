import express from "express";
import { exerciseController } from "../controllers/exercise.controller.js";
import { exerciseValidation } from "../validations/exercise.validation.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { checkRoleUser } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/admin",
  checkAuth,
  checkRoleUser.isAdmin,
  exerciseValidation.createOfficialExercise,
  exerciseController.createOfficialExercise,
);
router.post(
  "/users",
  checkAuth,
  exerciseValidation.createUsersExercise,
  exerciseController.createUsersExercise,
);

router.get("/", exerciseController.getAll);
router.get("/:exerciseId", exerciseController.getOneById);

router.patch(
  "/:exerciseId/admin",
  checkAuth,
  checkRoleUser.isAdmin,
  exerciseValidation.editOfficialExercise,
  exerciseController.editOfficialExercise,
);
router.patch(
  "/:exerciseId/users",
  checkAuth,
  exerciseValidation.editUsersExercise,
  exerciseController.editUsersExercise,
);
router.delete("/:exerciseId", checkAuth, exerciseController.deleteExercise);

export default router;
