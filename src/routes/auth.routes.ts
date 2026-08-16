import { Router } from "express";
import { register, login, getCurrentUser, logout } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { success } from "zod";

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

router.get("/dashboard", requireAuth, (req, res) => {
  res.status(200).json({
    success:true,
    message:"Welcome to the user dashboard",
    userId:req.session.userId
  })
})
export default router;