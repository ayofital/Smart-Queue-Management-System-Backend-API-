import express, { Router } from "express";
import {
  createTicket,
  // getMyTicket,
  // callTicket,
  // completeTicket,
  // skipTicket,
  // cancelTicket,
} from "../controllers/ticket.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const ticketRouter = Router();

// User creates a ticket (joins queue)
ticketRouter.post("/", protect, authorize("user"), createTicket);

// // User fetches their active ticket
// ticketRouter.get("/my-ticket", protect, authorize("user"), getMyTicket);

// // Staff calls a ticket
// ticketRouter.patch("/:id/call", protect, authorize("staff"), callTicket);

// // Staff completes a ticket
// ticketRouter.patch("/:id/complete", protect, authorize("staff"), completeTicket);

// // Staff skips a ticket
// ticketRouter.patch("/:id/skip", protect, authorize("staff"), skipTicket);

// // User cancels their ticket
// ticketRouter.patch("/:id/cancel", protect, authorize("user"), cancelTicket);

export default ticketRouter;
