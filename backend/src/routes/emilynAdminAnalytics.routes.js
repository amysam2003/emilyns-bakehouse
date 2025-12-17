import express from "express";
import { getEmilynAdminAnalytics } from "../controllers/emilynAdminAnalytics.controller.js";
import { emilynAuthProtection } from "../middleware/emilynAuth.middleware.js";
import { emilynAdminOnly } from "../middleware/emilynAdmin.middleware.js";
const emilynAdminAnalyticsRouter = express.Router();
emilynAdminAnalyticsRouter.get(
  "/analytics",
  emilynAuthProtection,
  emilynAdminOnly,
  getEmilynAdminAnalytics
);
export default emilynAdminAnalyticsRouter;