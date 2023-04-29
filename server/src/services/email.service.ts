import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createTransport } from "nodemailer";
import config from "../config/config.js";
import { compileTemplate } from "./templates.service.js";

const transport = createTransport({
  host: config.ADMIN_EMAIL_HOST,
  port: +config.ADMIN_EMAIL_PORT,
  auth: {
    user: config.ADMIN_EMAIL_ADDRESS,
    pass: config.ADMIN_EMAIL_APP_PASSWORD
  }
});

async function sendEmail({ to, subject, templateName, context }: {
  to: string;
  subject: string;
  templateName: string;
  context: Record<string, any>;
}) {
  try {
    const { html, text } = await compileTemplate(templateName, context);
    return transport.sendMail({
      from: config.ADMIN_EMAIL_ADDRESS,
      to,
      subject,
      html,
      text
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default {
  sendEmail,
};