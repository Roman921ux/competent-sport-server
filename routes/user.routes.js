import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { userController } from "../controllers/user.controller.js";
import { userValidator } from "../validations/user.validation.js";
const router = express.Router();

router.get("/me", checkAuth, userController.getMe);
router.put("/me", checkAuth, userValidator.editMe, userController.editMe);

export default router;
