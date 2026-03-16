import Staff from "../models/staff.model.js";
import{ validationResult } from "express-validator";

export const createStaff = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { name, email, password, role, branch } = req.body;

        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            const error = new Error("Staff with this email already exists");
            error.statusCode = 400;
            return next(error);
        }

        const staff = await Staff.create({ name, email,password, role, branch });

        res.status(201).json({
            message: "Staff account created successfully",
            data: {
                _id: staff._id,
                name: staff.name,
                email: staff.email,
                role: staff.role,
                branch: staff.branch,
            },
        });
    } catch (error) {
        next(error);
    }
};


export const getAllStaff = async (req, res, next) => {
    try {
        const staff = await Staff.find({ isActive: true}).populate(
            "branch",
            "name location"
        );

        if (!staff || staff.length === 0) {
            const error = new Error("No staff found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({ data: staff });
    }  catch (error) {
        next(error);
    }
};
  

export const assignStaffToBranch = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { branchId } = req.body;
        const { id } = req.params;

        const staff = await Staff.findByIdAndUpdate(
            id,
            { branch: branchId },
            { new: true }
        ).populate("branch", "name location");

        if (!staff) {
            const error = new Error("Staff not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            message: "Staff assigned to branch successfully",
            data: staff,
        });
    } catch (error) {
        next(error);
    }
};


export const deactivateStaff = async(req, res, next) => {
    try{
        const { id } = req.params;

        const staff = await Staff.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: false }
        );

        if(!staff){
            const error = new Error("Staff not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({ message: "Staff account deactivated successfully" });
    } catch (error){
        next(error);
    }
};

