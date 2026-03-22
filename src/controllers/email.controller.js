import { sendEmail } from "../services/email.service.js";

export const sendWelcomeEmail = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const subject = "Welcome to Job Tracker!";
    const text = `Hello ${name}, welcome to our job application tracker!`;
    const html = `<p>Hello <strong>${name}</strong>, welcome to our job application tracker!</p>`;

    await sendEmail({ to: email, subject, text, html });

    res.status(200).json({ message: "Welcome email sent successfully" });
  } catch (error) {
    next(error);
  }
};