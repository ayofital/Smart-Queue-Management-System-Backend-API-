import transporter from "../config/email.js";

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Job Tracker" <${process.env.EMAIL_USER}>`, // sender
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("FULL EMAIL ERROR:", error);
    throw error;
  }
};