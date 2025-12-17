import express from "express";
import {
  createEmilynPaymentIntent,
  confirmEmilynPayment,
} from "../controllers/emilynPayment.controller.js";
import { emilynAuthProtection } from "../middleware/emilynAuth.middleware.js";
const router = express.Router();
router.post("/create-payment-intent", createEmilynPaymentIntent);
router.post("/confirm-payment", confirmEmilynPayment);
export default router;