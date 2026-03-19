import express from "express";
import {
  createCounter,
  // getBranchCounters,
  assignStaffToCounter,
  closeCounter,
  getCounterById,
} from "../controllers/counter.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const counterRouter = express.Router();

// Admin creates a counter
counterRouter.post("/", protect, authorize("admin"), createCounter);

// Get all counters for a branch
// counterRouter.get(
//   "/branch/:branchId",
//   protect,
//   authorize("admin", "staff"),
//   getBranchCounters,
// );

// Get a single counter
counterRouter.get("/:branchId", protect, authorize("admin", "staff"), getCounterById);

// Assign a staff to a counter
counterRouter.patch(
  "/:counterId/assign-staff",
  protect,
  authorize("admin"),
  assignStaffToCounter,
);

// Close a counter
counterRouter.patch("/:counterId/close", protect, authorize("staff"), closeCounter);

export default counterRouter;
