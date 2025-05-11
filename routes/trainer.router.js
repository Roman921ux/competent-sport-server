import express from "express";
import { trainerController } from "../controllers/trainer.controller.js";
const router = express.Router();

router.get("/", trainerController.getAll);

export default router;
