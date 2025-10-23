// app/api/send-auto-reply/route.ts
import nodemailer from "nodemailer";

// Ensure this route runs on the Node.js runtime (required for SMTP and Nodemailer)
export const runtime = "nodejs";

// TypeScript interfaces for type safety
interface AutoReplyFormData {
  fullname: string;
  email: string;
  message: string;
}

interface AutoReplyResponse {
  message?: string;
  referenceNumber?: string;
  error?: string;
  details?: string;
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to sanitize input (prevent XSS in HTML email)
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

// Helper function to escape HTML for safe display in email
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullname, email, message } = body as AutoReplyFormData;

    // Enhanced validation
    if (!fullname || !email || !message) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: "All fields (fullname, email, message) are required",
        } as AutoReplyResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: "Please provide a valid email address",
        } as AutoReplyResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate field lengths
    if (fullname.length < 1 || fullname.length > 100) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: "Name must be between 1 and 100 characters",
        } as AutoReplyResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (message.length < 1 || message.length > 5000) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: "Message must be between 1 and 5000 characters",
        } as AutoReplyResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs to prevent XSS attacks in HTML email
    const sanitizedFullname = sanitizeInput(fullname);
    const sanitizedMessage = escapeHtml(message);

    // Generate random reference number
    const referenceNumber = `ARN-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;

    // Get current date in a nice format
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Use sanitized message for display
    const safeMessage = sanitizedMessage;
    const messagePreview =
      safeMessage.length > 200
        ? safeMessage.substring(0, 200) + "..."
        : safeMessage;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received - Arnob Mahmud</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap');
            
            body {
                font-family: 'JetBrains Mono', monospace;
                background-color: #f5f5f5;
                margin: 0;
                padding: 20px;
                line-height: 1.6;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            
            .header {
                background: linear-gradient(135deg, #1c1c22 0%, #00ff99 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                letter-spacing: -0.5px;
            }
            
            .header p {
                margin: 10px 0 0 0;
                font-size: 16px;
                opacity: 0.9;
            }
            
            .content {
                padding: 40px 30px;
                color: #1c1c22;
            }
            
            .greeting {
                font-size: 18px;
                margin-bottom: 20px;
                color: #1c1c22;
            }
            
            .message-box {
                background-color: #f8f9fa;
                border-left: 4px solid #00ff99;
                padding: 20px;
                margin: 25px 0;
                border-radius: 8px;
            }
            
            .message-box h3 {
                color: #00ff99;
                margin: 0 0 15px 0;
                font-size: 16px;
                font-weight: 600;
            }
            
            .reference-info {
                background-color: #f0f8ff;
                border: 1px solid #e0e7ff;
                padding: 15px;
                margin: 20px 0;
                border-radius: 8px;
                text-align: center;
            }
            
            .reference-number {
                font-size: 18px;
                font-weight: 700;
                color: #00ff99;
                margin-bottom: 5px;
            }
            
            .date-info {
                font-size: 14px;
                color: #666;
            }
            
            .next-steps {
                margin: 30px 0;
            }
            
            .next-steps h3 {
                color: #1c1c22;
                font-size: 18px;
                margin-bottom: 15px;
            }
            
            .next-steps ul {
                margin: 0;
                padding-left: 20px;
            }
            
            .next-steps li {
                margin-bottom: 8px;
                color: #1c1c22;
            }
            
            .closing {
                margin-top: 30px;
                font-style: italic;
                color: #666;
            }
            
            .signature {
                margin-top: 20px;
                font-weight: 600;
                color: #1c1c22;
            }
            
            .separator {
                border-top: 1px solid #e0e0e0;
                margin: 30px 0;
            }
            
            .footer {
                background-color: #f8f9fa;
                padding: 30px;
                text-align: center;
                color: #666;
            }
            
            .footer h3 {
                color: #1c1c22;
                margin: 0 0 20px 0;
                font-size: 20px;
                font-weight: 700;
            }
            
            .contact-info {
                display: flex;
                flex-direction: column;
                gap: 4px;
                margin: 8px 0;
            }
            
            .contact-item {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                font-size: 14px;
            }
            
            .contact-item a {
                color: #00ff99;
                text-decoration: none;
            }
            
            .contact-item a:hover {
                text-decoration: underline;
            }
            
            .disclaimer {
                font-size: 12px;
                color: #999 !important;
                margin: 20px 30px 30px 30px;
                padding: 15px;
                font-style: italic;
                text-align: center;
            }
            
            @media (max-width: 600px) {
                .email-container {
                    margin: 10px;
                }
                
                .header, .content, .footer {
                    padding: 20px;
                }
                
                .contact-info {
                    flex-direction: column;
                    align-items: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            
            
            <!-- Main Content -->
            <div class="content">
                <div class="greeting">
                    Dear ${sanitizedFullname},
                </div>
                
                <p>Thank you for reaching out! I've successfully received your message and I'm excited to connect with you.</p>
                
                <div class="message-box">
                    <h3>📧 Your Message Details:</h3>
                    <p><strong>Subject:</strong> Portfolio Contact Form Inquiry</p>
                    <p><strong>Message:</strong> ${messagePreview}</p>
                </div>
                
                <div class="reference-info">
                    <div class="reference-number">Reference #${referenceNumber}</div>
                    <div class="date-info">Received on ${currentDate}</div>
                </div>
                
                <div class="next-steps">
                    <h3>🚀 What happens next?</h3>
                    <ul>
                        <li>I'll review your message within 24 hours</li>
                        <li>You'll receive a personalized response via email</li>
                        <li>If needed, we can schedule a call to discuss your project</li>
                        <li>I'm ready to help bring your ideas to life!</li>
                    </ul>
                </div>
                
                <div class="closing">
                    <p>I appreciate your interest in working together and look forward to collaborating with you.</p>
                </div>
                
                <div class="signature">
                    Best regards,<br>
                    Arnob Mahmud<br>
                    <em>Full-Stack Developer & Automation Engineer</em>
                </div>
            </div>
            
            <!-- Separator -->
            <div class="separator"></div>
            
            <!-- Disclaimer -->
            <div style="font-size: 12px; color: #878787ff; margin: 20px 30px 30px 30px; padding: 15px; font-style: italic; text-align: center;">
                This is an automated message. Please do not reply to this email. For assistance, please contact us at arnobt78@gmail.com or call +49 157 34664351
            </div>
        </div>
    </body>
    </html>
    `;

    // Create Gmail SMTP transporter using app password
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // use STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Arnob Mahmud Portfolio <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Message Received - Reference #${referenceNumber} | Arnob Mahmud`,
      html: htmlContent,
      replyTo: process.env.EMAIL_USER, // keep thread centralized
    } as const;

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        message: "Auto-reply sent successfully",
        referenceNumber,
      } as AutoReplyResponse),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Auto-reply error:", error);

    // Enhanced error handling
    if (error instanceof Error) {
      // Check for specific SMTP errors
      if (error.message.includes("EAUTH")) {
        return new Response(
          JSON.stringify({
            error: "Authentication failed",
            details:
              "Email service authentication error. Please try again later.",
          } as AutoReplyResponse),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      if (error.message.includes("ECONNECTION")) {
        return new Response(
          JSON.stringify({
            error: "Connection failed",
            details:
              "Unable to connect to email server. Please try again later.",
          } as AutoReplyResponse),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      if (error.message.includes("ETIMEDOUT")) {
        return new Response(
          JSON.stringify({
            error: "Timeout error",
            details: "Email server request timed out. Please try again.",
          } as AutoReplyResponse),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          error: "Error sending auto-reply",
          details: error.message,
        } as AutoReplyResponse),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Error sending auto-reply",
        details: "Unknown error occurred",
      } as AutoReplyResponse),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
