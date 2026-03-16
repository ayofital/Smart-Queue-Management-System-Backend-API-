import Ticket from "../models/ticket.model.js";
import Queue from "../models/queue.model.js";
import { validationResult } from "express-validator";

export const createTicket = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { queueId, branchId } = req.body;
    const userId = req.user.id;

    const queueExists = await Queue.findById(queueId);

    if (!queueExists) {
      const error = new Error("Queue not found");
      error.statusCode = 404;
      return next(error);
    }

    const lastTicket = await Ticket.findOne({ queue: queueId }).sort({
      ticketNumber: -1,
    });

    const ticketNumber = lastTicket ? lastTicket.ticketNumber + 1 : 1;

    const ticket = await Ticket.create({
      user: userId,
      queue: queueId,
      branch: branchId,
      ticketNumber,
    });

    res.status(201).json({
      message: "Ticket created successfully",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};
