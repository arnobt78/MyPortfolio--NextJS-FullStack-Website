// app/api/send-email/route.ts
import nodemailer from "nodemailer";

// Ensure Node.js runtime (not Edge) for Nodemailer/SMTP
export const runtime = "nodejs";

// TypeScript interfaces for type safety
interface ContactFormData {
  fullname: string;
  email: string;
  message: string;
}

interface EmailResponse {
  message?: string;
  error?: string;
  details?: string;
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to sanitize input (prevent XSS)
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullname, email, message } = body as ContactFormData;

    // Debug log: show incoming request body
    console.log("[send-email] Incoming body:", body);

    // Input validation with debug logs
    if (!fullname || !email || !message) {
      console.error("[send-email] Validation failed: missing fields", {
        fullname,
        email,
        message,
      });
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: "All fields (fullname, email, message) are required",
        } as EmailResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!isValidEmail(email)) {
      console.error("[send-email] Validation failed: invalid email", email);
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: "Please provide a valid email address",
        } as EmailResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (fullname.length < 1 || fullname.length > 100) {
      console.error(
        "[send-email] Validation failed: name length",
        fullname.length
      );
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: "Name must be between 1 and 100 characters",
        } as EmailResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (message.length < 1 || message.length > 5000) {
      console.error(
        "[send-email] Validation failed: message length",
        message.length
      );
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: "Message must be between 1 and 5000 characters",
        } as EmailResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitizedFullname = sanitizeInput(fullname);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    const transporter = nodemailer.createTransport({
      // for gmail
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      // for yahoo!
      // host: "smtp.mail.yahoo.com",
      // port: 465 or 587,
      // secure: false, // use TLS
      // auth: {
      //   user: "arnobt_78@yahoo.com",
      //   pass: "app-password-generated",
      // },
    });

    // Use your authenticated sender as 'from' to avoid DMARC issues.
    // Put the user's address in replyTo so you can reply easily.
    const mailOptions = {
      from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: sanitizedEmail,
      subject: `Important! New message from ${sanitizedFullname}`,
      text: `Name: ${sanitizedFullname}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`,
    } as const;

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        message: "Email sent successfully",
      } as EmailResponse),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Enhanced error handling
    if (error instanceof Error) {
      // Check for specific SMTP errors
      if (error.message.includes("EAUTH")) {
        return new Response(
          JSON.stringify({
            error: "Authentication failed",
            details:
              "Email service authentication error. Please try again later.",
          } as EmailResponse),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      if (error.message.includes("ECONNECTION")) {
        return new Response(
          JSON.stringify({
            error: "Connection failed",
            details:
              "Unable to connect to email server. Please try again later.",
          } as EmailResponse),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          error: "Error sending email",
          details: error.message,
        } as EmailResponse),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Error sending email",
        details: "Unknown error occurred",
      } as EmailResponse),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
