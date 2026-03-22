import { Router } from "express";

const router = Router();

//  Root route (this is what you need)
router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Smart Queue Management API is running "
  });
});

// Existing route
router.get("/health", (req, res) => {
  res.json({ ok: true });
});

export default router;