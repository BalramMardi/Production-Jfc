import express from "express";
import {
  forgotPasswordController,
  getCurrentUser,
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

//register
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//User
router.get("/current-user", requireSignIn, getCurrentUser);

//FogotPassword
router.post("/forgot-password", forgotPasswordController);

//tests
router.get("/test", requireSignIn, testController);

export default router;
