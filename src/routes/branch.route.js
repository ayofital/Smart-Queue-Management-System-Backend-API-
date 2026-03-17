import express, { Router } from "express";
import {
  createBranch,
  getAllBranches,
  getSingleBranch,
  // updateBranch,
  deleteBranch,
} from "../controllers/branch.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const branchRouter = Router();

// Admin creates a new branch
branchRouter.post("/", protect, authorize("admin"), createBranch);

// Admin fetches all branches
branchRouter.get("/", protect, authorize("admin"), getAllBranches);

// Admin fetches a single branch
branchRouter.get("/:id", protect, authorize("admin"), getSingleBranch);

// Admin updates branch details
// branchRouter.put("/:id", protect, authorize("admin"), updateBranch);

// Admin deletes a branch
branchRouter.delete("/:id", protect, authorize("admin"), deleteBranch);

export default branchRouter;
