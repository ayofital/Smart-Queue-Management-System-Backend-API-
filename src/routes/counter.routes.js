import express from "express";
import {
  createCounter,
  getBranchCounters,
  assignStaffToCounter,
  closeCounter,
} from "../controllers/counter.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin"), createCounter);
router.get("/:branchId", getBranchCounters);
router.put("/:id/assign", authorize("admin"), assignStaffToCounter);
router.put("/:id/close", closeCounter);

export default router;
