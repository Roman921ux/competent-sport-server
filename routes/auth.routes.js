import express from "express";
import { authValidator } from "../validations/auth-validation.js";
import { authController } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/register", authValidator.register, authController.register);
router.post("/login", authValidator.login, authController.login);

export default router;
