import express from "express";
import { createEmilynOrder, getMyEmilynOrders, getEmilynOrderById } from "../controllers/emilynOrder.controller.js";
import { emilynAuthProtection } from "../middleware/emilynAuth.middleware.js";
const emilynOrderRouter = express.Router();
emilynOrderRouter.post("/create", emilynAuthProtection, createEmilynOrder);
emilynOrderRouter.get("/my", emilynAuthProtection, getMyEmilynOrders);
emilynOrderRouter.get("/:id", emilynAuthProtection, getEmilynOrderById);
export default emilynOrderRouter;