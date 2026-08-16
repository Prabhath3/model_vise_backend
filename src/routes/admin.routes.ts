import { Router } from "express"
import { requireRole } from "../middleware/auth.middleware.js"
import { success } from "zod"

const router = Router()

router.get(
    "/dashboard",
    requireRole("ADMIN"),
    (req, res) => {
        res.status(200).json({
            success:true,
            message:"Welcome to the admin dashboard",
            userId : req.session.userId
        })
    }
)
export default router;
