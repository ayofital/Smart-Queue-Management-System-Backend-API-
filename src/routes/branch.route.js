import { Router } from "express";
import {
  createBranch,
  deleteBranch,
  getBranches,
  getSingleBranch,
  // updateBranch,
} from "../controllers/branch.controller.js";

const branch_router = Router();

branch_router.get("/", getBranches);
branch_router.post("/", createBranch);
branch_router.get("/:id", getSingleBranch);
// branch_router.patch("/:id", updateBranch);
branch_router.delete("/:id", deleteBranch);

export default branch_router;
