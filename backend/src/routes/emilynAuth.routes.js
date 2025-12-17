import express from "express";
import {
  emilynSignupController,
  emilynLoginController,
} from "../controllers/emilynAuth.controller.js";
const emilynAuthRouter = express.Router();
emilynAuthRouter.post("/signup", emilynSignupController);
emilynAuthRouter.post("/login", emilynLoginController);
export default emilynAuthRouter;