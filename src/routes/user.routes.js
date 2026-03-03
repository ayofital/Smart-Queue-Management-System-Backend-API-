import express from "express"
import { protect, authhorize } from "../middleware/auth.middleware"

const router = express.Router()

router.get("/profile", protect,(req,res) => {
    res.json(req.user)
})

router.get("/admin-only", protect, authorize("admin"), (req, res) => {
    res.json({message: "Welcome Admin"})
})

export default router