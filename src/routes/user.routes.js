import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

userRouter.get("/admin-only", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default userRouter;
