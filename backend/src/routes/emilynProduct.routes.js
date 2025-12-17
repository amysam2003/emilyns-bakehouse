import express from "express";
import {
  addEmilynBakeItem,
  getAllEmilynBakeItems,
  updateEmilynBakeItem,
  deleteEmilynBakeItem,
} from "../controllers/emilynProduct.controller.js";
import { emilynAuthProtection, emilynAdminOnly } from "../middleware/emilynAuth.middleware.js";
import { emilynUpload } from "../middleware/emilynUpload.middleware.js";
const emilynProductRouter = express.Router();
emilynProductRouter.get("/", getAllEmilynBakeItems);
emilynProductRouter.post(
  "/add",
  emilynAuthProtection,
  emilynAdminOnly,
  emilynUpload.single("bakeryItemImage"),
  addEmilynBakeItem
);
emilynProductRouter.put(
  "/update/:id",
  emilynAuthProtection,
  emilynAdminOnly,
  emilynUpload.single("bakeryItemImage"),
  updateEmilynBakeItem
);
emilynProductRouter.delete(
  "/delete/:id",
  emilynAuthProtection,
  emilynAdminOnly,
  deleteEmilynBakeItem
);
export default emilynProductRouter;