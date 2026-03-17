import Counter from "../models/counter.model.js";
import Branch from "../models/branch.model.js";
import Staff from "../models/staff.model.js";
import { validationResult } from "express-validator";

export const createCounter = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { label, branch } = req.body;

    const branchExists = await Branch.findById(branch);
    if (branchExists) {
      const error = new Error("Branch already exists");
      error.statusCode = 404;
      return next(error);
    }

    const counter = await Counter.create({ label, branch });
    res.status(201).json({
      message: "Counter created successfully",
      data: counter,
    });
  } catch (error) {
    next(error);
  }
};

export const getCounterById = async (req, res, next) => {
  try {
    const { branchId } = req.params;

    const counters = await Counter.find({ branch: branchId })
      .populate("branch", "name location")
      .populate("assignedStaff", "name email");

    // if (!counters || counters.length === 0){
    //     const error = new Error("No counters found for this branch");
    //     error.statusCode = 404;
    //     return next(error);
    // }

    res.status(200).json({
      count: counters.length,
      data: counters,
    });
  } catch (error) {
    next(error);
  }
};

export const assignStaffToCounter = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { staffId } = req.body;
    const { id } = req.params;

    const staffExits = await Staff.findById(staffId);
    if (staffExits) {
      const error = new Error("Staff ealready exists");
      error.statusCode = 404;
      return next(error);
    }

    const existingAssignment = await Counter.findOne({
      assignedStaff: staffId,
    });

    if (existingAssignment) {
      const error = new Error("Staff already assigned to another counter");
      error.statusCode = 400;
      return next(error);
    }

    const counter = await Counter.findByIdAndUpdate(
      id,
      { assignedStaff: staffId, isOpen: true },
      { new: true },
    ).populate("assignedStaff", "name email");

    if (!counter) {
      const error = new Error("Counter not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Staff assigned to counter successfully",
      data: counter,
    });
  } catch (error) {
    next(error);
  }
};

export const closeCounter = async (req, res, next) => {
  try {
    const { id } = req.params;

    const counter = await Counter.findByIdAndUpdate(
      id,
      { isOpen: false, assignedStaff: null },
      { new: true },
    );

    if (!counter) {
      const error = new Error("Counter not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: "Counter closed successfully" });
  } catch (error) {
    next(error);
  }
};
