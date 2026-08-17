import { Router } from "express";
import { requireRole } from "../middleware/auth.middleware.js";
import { getAdminDashboard } from "../controllers/admin.controller.js";

const router = Router();

router.get(
  "/dashboard",
  requireRole("ADMIN"),
  getAdminDashboard
);

export default router;