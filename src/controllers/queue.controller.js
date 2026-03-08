import Queue from "../models/queue.model.js";
import Branch from "../models/branch.model.js";
import { validationResult } from "express-validator";


export const createQueue = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { serviceName, branch, prefix } = req.body;

        const branchExists = await Branch.findbyId(branch);
        if (!branchExists) {
            const error = new Error("Branch not found");
            error.statusCode = 400;
            return next(error);
        }

        const queue = await Queue.create({ serviceName, branch, prefix });

        res.status(201).json({
            message: "Queue created successfully",
            data: queue,
        });
    } catch (error) {
        next(error);
    }
};

export const getBranchQueue = async (req, res, next) => {
    try{
        const { branchId} = req.params;

        const queues = await Queue.find({ branch: branchId, isActive: true})
        .populate("branch", "name location");

        if (!queues || queues.length === 0){
            const error = new Error("No queues found for this branch");
            error.statusCode = 404;
            return next(error);
        } 

        res.status(200).json({ data: queues});
    }   catch (error) {
        next(error);
    }
};

export const updateQueue = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id} = req.params;

        const queue = await Queue.findByIdUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!queue) {
            const error = new Error("Queue not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            message: "Queue updated successfully",
            data: queue,
        });
    }   catch (error) {
        next(error);
    }
};

export const deleteQueue = async (req, res, next) => {
    try{
        const { id } = req.params;

        const queue = await Queue.findById(id);

        if (!queue) {
            const error = new Error("Queue not found");
            error.statusCode = 404;
            return next(error);
        }
        await queue.deleteOne();

        res.status(200).json({ message: "Queue deleted successfully"});
    }   catch (error) {
        next(error);
    }
};

