import Ticket from "../models/ticket.model.js";
import Queue from "../models/queue.model.js";
import { validationResult } from "express-validator";
import { sendEmail } from "../services/email.service.js";
import User from "../models/user.model.js";

export const createTicket = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { queueId, branchId } = req.body;
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });
    // console.log(user)

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

    console.log("SMTP Config:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? "✓ Set" : "✗ Missing",
      pass: process.env.SMTP_PASS ? "✓ Set" : "✗ Missing",
      from: process.env.SMTP_FROM,
    });

    // Send Email When Ticket is Generated
    await sendEmail({
      to: user.email,
      subject: "Your Queue Ticket",
      html: `<h2>Ticket Created</h2>
          <p>Your queue ticket has been created successfully.</p>
          <p>Your ticket number is <b>${ticket.ticketNumber}</b></p>`,
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

    const user = await User.findOne({ _id: userId });

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

    // Send Email when ticket is being called
    await sendEmail({
      to: user.email,
      subject: "Your Ticket is Being Served",
      html: `<h2>Your Ticket is Being Called</h2>
          <p>Ticket NUmber:<b>${ticket.ticketNumber}</b></p>
          <p>Please proceed to the counter.</p>`,
    });

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
