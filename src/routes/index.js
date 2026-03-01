import { Router } from "express"

const router = Router()
router.get("/health", (req, res) => {
    res.join({ok: true})
})

export default router