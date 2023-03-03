import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

const sendEmail = async ({ from, to, subject, text, html, attachments }) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
    attachments,
  });
};

export { sendEmail };
