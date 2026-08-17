import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getUserDashboard } from "../controllers/user.controller.js";

const router = Router();

router.get(
  "/dashboard",
  requireAuth,
  getUserDashboard
);

export default router;