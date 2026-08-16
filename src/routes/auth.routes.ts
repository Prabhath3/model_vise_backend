import { Router } from "express";
import { register, login, getCurrentUser, logout } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
)

router.get(
  "/me",
  requireAuth,
  getCurrentUser
)

router.post(
  "/logout",
  logout
)
export default router;