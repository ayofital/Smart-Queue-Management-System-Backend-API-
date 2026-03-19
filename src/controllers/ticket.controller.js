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

    const queue = await Queue.findByIdAndUpdate(
      queueId,
      { $inc: { lastTicketNumber: 1 } },
      { new: true },
    );

    if (!queue) {
      const error = new Error("Queue not found");
      error.statusCode = 404;
      return next(error);
    }

    const ticketNumber = queue.lastTicketNumber;

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

export const getMyTicket = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const ticket = await Ticket.findOne({
      user: userId,
      status: { $in: ["waiting", "called"] },
    })
      .populate("queue", "name")
      .populate("branch", "name location");

    if (!ticket) {
      const error = new Error("No active ticket found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const callTicket = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      {
        status: "called",
        calledAt: new Date(),
      },
      { new: true },
    );

    if (!ticket) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Ticket called successfully",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const completeTicket = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      {
        status: "completed",
        completedAt: new Date(),
      },
      { new: true },
    );

    if (!ticket) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Ticket completed successfully",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const skipTicket = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      {
        status: "skipped",
      },
      { new: true },
    );

    if (!ticket) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Ticket skipped",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelTicket = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      {
        status: "cancelled",
        cancelledAt: new Date(),
      },
      { new: true },
    );

    if (!ticket) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Ticket cancelled successfully",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};