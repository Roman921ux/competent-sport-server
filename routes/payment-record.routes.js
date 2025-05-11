import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { paymentRecordController } from "../controllers/payment-record.controller.js";
import { paymentRecordValidation } from "../validations/payment-record.validation.js";
const router = express.Router();

router.post(
  "/",
  checkAuth,
  paymentRecordValidation.createPayment,
  paymentRecordController.createPayment,
);
router.get("/", checkAuth, paymentRecordController.getPaymentUser);

export default router;
