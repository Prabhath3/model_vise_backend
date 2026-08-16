import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/dashboard", requireAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the user dashboard",
    userId: req.session.userId
  });
});

export default router;