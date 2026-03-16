import express from "express";
import {
  createStaff,
  getAllStaff,
  assignStaffToBranch,
  deactivateStaff,
} from "../controllers/staff.controller.js";
import { createStaffValidator, assignStaffValidator } from "../validators/staff.validator.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.post("/", createStaffValidator, createStaff);
router.get("/", getAllStaff);
router.put("/:id/assign", assignStaffValidator, assignStaffToBranch);
router.delete("/:id", deactivateStaff);

export default router;