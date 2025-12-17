import express from "express";
import {
  addToEmilynCart,
  getEmilynCart,
  updateEmilynCartItem,
  removeFromEmilynCart,
} from "../controllers/emilynCart.controller.js";
import { emilynAuthProtection } from "../middleware/emilynAuth.middleware.js";
const emilynCartRouter = express.Router();
emilynCartRouter.get("/", emilynAuthProtection, getEmilynCart);
emilynCartRouter.post("/add", emilynAuthProtection, addToEmilynCart);
emilynCartRouter.put("/update", emilynAuthProtection, updateEmilynCartItem);
emilynCartRouter.delete(
  "/remove/:productId",
  emilynAuthProtection,
  removeFromEmilynCart
);
export default emilynCartRouter;