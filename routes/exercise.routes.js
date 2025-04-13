import express from "express";
import { exerciseController } from "../controllers/exercise.controller.js";
import { exerciseValidation } from "../validations/exercise.validation.js";

const router = express.Router();

router.post("/", exerciseValidation.create, exerciseController.create);

export default router;
