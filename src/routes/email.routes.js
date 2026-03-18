import { Router } from "express";
import { sendWelcomeEmail } from "../controllers/email.controller.js";

const router = Router();

router.post("/welcome", sendWelcomeEmail);

router.post("/welcome", (req, res) => {
  res.send("WELCOME ROUTE HIT");
});

export default router;