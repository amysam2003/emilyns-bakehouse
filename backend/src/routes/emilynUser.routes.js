import express from "express";
import { updateEmilynProfile, changeEmilynPassword } from "../controllers/emilynUser.controller.js";
import { emilynAuthProtection } from "../middleware/emilynAuth.middleware.js";
const emilynUserRouter = express.Router();
emilynUserRouter.put("/profile", emilynAuthProtection, updateEmilynProfile);
emilynUserRouter.put("/change-password", emilynAuthProtection, changeEmilynPassword);
export default emilynUserRouter;